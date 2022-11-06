import { Fragment, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, Spinner } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTotalItemCountForOrderItems, getTotalPriceForOrderItems } from '../../utils/utils'
import { DeliveryMethod } from '../../types/types'
import FloatingButton from '../../components/FloatingButton'
import { deliveryFee } from '../../api/wolt'
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
  const [ fee, setFee ] = useState<number | null>(null)
  const [ eta, setEta ] = useState<number | null>(null)
  const [ disabled, setDisabled ] = useState(true)
  const route = useRoute<any>()
  const navigation = useNavigation<any>()

  // Fetch the delivery fee and ETA when the screen is opened
  useEffect(() => {
    const pickupAddress = 'Tietotie 1, 02150 Espoo'
    deliveryFee(pickupAddress).then(data => {
      setFee(data.fee.amount / 100)
      setEta(data.time_estimate_minutes)
      setDisabled(false)
    })
  })

  // Create the delivery
  function submit() {
    if (disabled) return
    // setDisabled(true)
    console.log('create delivery')
    // setTimeout()
    navigation.navigate('Completed')
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
