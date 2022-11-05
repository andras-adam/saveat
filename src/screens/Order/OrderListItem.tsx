import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Minus, Plus } from 'phosphor-react-native'
import { OrderItem } from '../../types/types'


const styles = StyleSheet.create({
  orderItemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  orderItemAmount: {
    paddingHorizontal: 10
  },
  orderItemButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 14,
    padding: 6
  },
  orderItemTitle: {
    paddingHorizontal: 20
  },
  orderItemPrice: {
    flex: 1,
    textAlign: 'right'
  }
})

interface OrderListItemProps {
  changeAmount: (amount: number) => unknown
  item: OrderItem
}

export default function OrderListItem({ item, changeAmount }: OrderListItemProps) {
  return (
    <View style={styles.orderItemContainer}>
      <TouchableOpacity onPress={() => changeAmount(item.amount + 1)}>
        <View style={styles.orderItemButton}>
          <Plus size={16}/>
        </View>
      </TouchableOpacity>
      <Text style={styles.orderItemAmount}>{item.amount}</Text>
      <TouchableOpacity onPress={() => changeAmount(item.amount - 1)}>
        <View style={styles.orderItemButton}>
          <Minus size={16}/>
        </View>
      </TouchableOpacity>
      <Text style={styles.orderItemTitle}>{item.title}</Text>
      <Text style={styles.orderItemPrice}>€ {Math.round((item.amount * item.unitPrice * 100)) / 100}</Text>
    </View>
  )
}
