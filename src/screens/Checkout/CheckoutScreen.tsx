import { Fragment, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, Spinner } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTotalItemCountForOrderItems, getTotalPriceForOrderItems } from '../../utils/utils'
import { DeliveryMethod } from '../../types/types'
import FloatingButton from '../../components/FloatingButton'
import { deliveryFee, deliveryOrder } from '../../api/wolt'
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
const mockPickupAddress = 'Leppavaarankatu 3, 02610 Espoo'

export default function CheckoutScreen() {
  const [ deliveryMethod, setDeliveryMethod ] = useState(DeliveryMethod.Bicycle)
  const [ card, setCard ] = useState(mockCards[0])
  const [ fee, setFee ] = useState<number | null>(null)
  const [ eta, setEta ] = useState<number | null>(null)
  const [ disabled, setDisabled ] = useState(true)
  const route = useRoute<any>()
  const navigation = useNavigation<any>()

  // Fetch the delivery fee and ETA when the screen is opened
  useEffect(() => {
    deliveryFee(mockPickupAddress).then(data => {
      setFee(data.fee.amount / 100)
      setEta(data.time_estimate_minutes)
      setDisabled(false)
    })
  }, [])

  // Create the delivery
  function submit() {
    if (disabled) return
    setDisabled(true)
    const contents = route.params.items.map((item: any) => ({
      count: item.amount,
      description: item.title,
      identifier: item.id,
      tags: []
    }))
    deliveryOrder(mockPickupAddress, contents).then(data => {
      navigation.navigate('Completed', { trackingUrl: data.tracking.url })
    })
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
        <View style={styles.total}>
          <View style={styles.totalSegment}>
            <Text>Delivery fee:</Text>
            {fee ? <Text>€ {fee}</Text> : <Spinner />}
          </View>
          <View style={styles.totalSegment}>
            <Text>Delivery ETA:</Text>
            {eta ? <Text>{eta}m</Text> : <Spinner />}
          </View>
        </View>
      </ScrollView>
      <FloatingButton title="Press to confirm" onPress={submit} disabled={disabled} />
    </Fragment>
  )
}
