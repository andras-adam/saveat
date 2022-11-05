import { Fragment, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTotalPriceForOrderItems } from '../../utils/utils'
import { OrderItem } from '../../types/types'
import { DishDataType } from '../../api/firebaseHelper'
import FloatingButton from '../../components/FloatingButton'
import OrderListItem from './OrderListItem'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  }
})

const uri = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'

export default function OrderScreen() {
  const { navigate } = useNavigation<any>()
  const route = useRoute<any>()
  const dishes = route.params.dishes as DishDataType[]
  const orderItems = dishes.map((e, index) => ({
    id: String(index),
    title: e.name,
    unitPrice: e.price,
    amount: 1,
    uri
  }))

  const [ items, setItems ] = useState<OrderItem[]>(orderItems)

  // Change the amount of an order item
  function setAmount(id: string, amount: number) {
    setItems(currentItems => {
      const itemIndex = currentItems.findIndex(x => x.id === id)
      const newItem = { ...currentItems[itemIndex], amount: Math.max(amount, 0) }
      return [ ...currentItems.slice(0, itemIndex), newItem, ...currentItems.slice(itemIndex + 1) ]
    })
  }

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        {items.map(item => (
          <OrderListItem
            key={item.id}
            item={item}
            changeAmount={amount => setAmount(item.id, amount)}
          />
        ))}
      </ScrollView>
      <FloatingButton
        title={`Go to checkout — € ${getTotalPriceForOrderItems(items)}`}
        onPress={() => navigate('Checkout', { items })}
      />
    </Fragment>
  )
}
