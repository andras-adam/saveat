import { Fragment, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, ScrollView } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTotalPriceForOrderItems } from '../../utils/utils'
import { OrderItem } from '../../types/types'
import { DishDataType } from '../SignIn/firebaseHelper'
import OrderListItem from './OrderListItem'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  actionButton: {
    margin: 20
  }
})

const mockOrderItems: OrderItem[] = [
  { id: '0', title: 'Salad', unitPrice: 5.99, amount: 1 },
  { id: '1', title: 'Rice', unitPrice: 4.25, amount: 1 },
  { id: '2', title: 'Beef', unitPrice: 12.49, amount: 1 }
]

export default function OrderScreen() {
  const { navigate } = useNavigation<any>()
  const route = useRoute<any>()
  const dishes = route.params.dishes as DishDataType[]
  const orderItems = dishes.map((e, index) => ({
    id: String(index),
    title: e.name,
    unitPrice: e.price,
    amount: 1
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
      <View style={styles.actionButtonContainer}>
        <Button style={styles.actionButton} onPress={() => navigate('Checkout', { items })}>
          {`Go to checkout — € ${getTotalPriceForOrderItems(items)}`}
        </Button>
      </View>
    </Fragment>
  )
}
