import { Fragment, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { getTotalItemCountForOrderItems, getTotalPriceForOrderItems } from '../../utils/utils'
import { DeliveryMethod } from '../../types/types'
import FloatingButton from '../../components/FloatingButton'
import DeliveryMethodSelector from './DeliveryMethodSelector'
import PaymentMethodSelector from './PaymentMethodSelector'


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

const mockCards = [ 'Nordea', 'Google Pay', 'Edenred' ]

export default function CheckoutScreen() {
  const [ deliveryMethod, setDeliveryMethod ] = useState(DeliveryMethod.Bicycle)
  const [ card, setCard ] = useState(mockCards[0])
  const route = useRoute<any>()

  function submit() {
    //
  }

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <DeliveryMethodSelector value={deliveryMethod} setValue={setDeliveryMethod} />
        <PaymentMethodSelector options={mockCards} value={card} setValue={setCard} />
        <View style={styles.total}>
          <View style={styles.totalSegment}>
            <Text>Total items:</Text>
            <Text>{getTotalItemCountForOrderItems(route.params.items)} item(s)</Text>
          </View>
          <View style={styles.totalSegment}>
            <Text>Total price:</Text>
            <Text>€ {getTotalPriceForOrderItems(route.params.items)}</Text>
          </View>
        </View>
      </ScrollView>
      <FloatingButton title="Press to confirm" onPress={submit} />
    </Fragment>
  )
}
