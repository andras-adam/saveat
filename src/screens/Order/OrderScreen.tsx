import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { OrderItem } from '../../types/types'
import OrderListItem from './OrderListItem'


const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  total: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  totalSegment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

const orderItems: OrderItem[] = [
  { id: '0', title: 'Salad', unitPrice: 5.99, amount: 1 },
  { id: '1', title: 'Rice', unitPrice: 4.25, amount: 1 },
  { id: '2', title: 'Beef', unitPrice: 12.49, amount: 1 }
]

export default function OrderScreen() {
  const { navigate } = useNavigation<any>()
  const [ items, setItems ] = useState<OrderItem[]>(orderItems)

  // Change the amount of an order item
  function setAmount(id: string, amount: number) {
    setItems(currentItems => {
      const itemIndex = currentItems.findIndex(x => x.id === id)
      const newItem = { ...currentItems[itemIndex], amount: Math.max(amount, 0) }
      return [ ...currentItems.slice(0, itemIndex), newItem, ...currentItems.slice(itemIndex + 1) ]
    })
  }

  // Get the total count of all items
  function getTotalItemCount() {
    return items.reduce((acc, cur) => acc + cur.amount, 0)
  }

  // Get the total price of all items
  function getTotalPrice() {
    const price = items.reduce((acc, cur) => acc + (cur.unitPrice * cur.amount), 0)
    return Math.round(price * 100) / 100
  }

  return (
    <View style={styles.container}>
      {items.map(item => (
        <OrderListItem
          key={item.id}
          item={item}
          changeAmount={amount => setAmount(item.id, amount)}
        />
      ))}
      <View style={styles.total}>
        <View style={styles.totalSegment}>
          <Text>Total items:</Text>
          <Text>{getTotalItemCount()} item(s)</Text>
        </View>
        <View style={styles.totalSegment}>
          <Text>Total price:</Text>
          <Text>€ {getTotalPrice()}</Text>
        </View>
      </View>
      <Button onPress={() => navigate('Checkout')}>Go to checkout</Button>
    </View>
  )
}
