import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Minus, Plus } from 'phosphor-react-native'
import { OrderItem } from '../../types/types'


const styles = StyleSheet.create({
  orderItemContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 4,
    backgroundColor: '#dddddd'
  },
  amountButton: {
    borderRadius: 14,
    padding: 6,
    backgroundColor: '#ffffff'
  },
  amountText: {
    paddingHorizontal: 10
  },
  dishContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  dishTitle: {
    fontWeight: 'bold',
    paddingBottom: 4
  },
  dishText: {
    fontSize: 13
  },
  dishPrice: {
    fontWeight: 'bold',
    paddingTop: 4
  },
  preview: {
    width: 64,
    height: 64,
    borderRadius: 12
  }
})

interface OrderListItemProps {
  changeAmount: (amount: number) => unknown
  item: OrderItem
}

export default function OrderListItem({ item, changeAmount }: OrderListItemProps) {
  return (
    <View style={styles.orderItemContainer}>
      <View style={styles.amountContainer}>
        <TouchableOpacity onPress={() => changeAmount(item.amount + 1)}>
          <View style={styles.amountButton}>
            <Plus size={16}/>
          </View>
        </TouchableOpacity>
        <Text style={styles.amountText}>{item.amount}</Text>
        <TouchableOpacity onPress={() => changeAmount(item.amount - 1)}>
          <View style={styles.amountButton}>
            <Minus size={16}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dishContainer}>
        <Text style={styles.dishTitle}>{item.title}</Text>
        {Array.from({ length: item.amount }).map((_, index) => (
          <Text key={index} style={styles.dishText}>1 x item</Text>
        ))}
        <Text style={styles.dishPrice}>€ {Math.round((item.amount * item.unitPrice * 100)) / 100}</Text>
      </View>
      <View style={[ styles.preview, { backgroundColor: '#ffc4c4' }]} />
    </View>
  )
}
