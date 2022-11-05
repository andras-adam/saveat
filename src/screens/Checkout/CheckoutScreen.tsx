import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'native-base'
import { DeliveryMethod } from '../../types/types'
import { deliveryFee } from '../../api/wolt'
import DeliveryMethodSelector from './DeliveryMethodSelector'
import PaymentMethodSelector from './PaymentMethodSelector'


console.log(process.env)

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

const cards = [ 'Nordea', 'Google Pay', 'Edenred' ]

export default function CheckoutScreen() {
  const [ deliveryMethod, setDeliveryMethod ] = useState(DeliveryMethod.Bicycle)
  const [ card, setCard ] = useState(cards[0])

  useEffect(() => {
    deliveryFee('Leppävaarankatu 3-9, 02600 Espoo', 'Runoratsunkatu 5, 02600 Espoo')
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <DeliveryMethodSelector value={deliveryMethod} setValue={setDeliveryMethod} />
      <PaymentMethodSelector options={cards} value={card} setValue={setCard} />
      <Button>Pay</Button>
    </View>
  )
}
