import { Fragment } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Actionsheet, useDisclose } from 'native-base'
import { CreditCard } from 'phosphor-react-native'


const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  selectButton: {
    paddingStart: 20
  },
  selectTitle: {
    fontWeight: 'bold'
  },
  selectDescription: {},
  actionSheetItem: {
    flexDirection: 'row'
  },
  actionSheetItemLabel: {
    paddingStart: 20
  }
})

interface PaymentMethodSelectorProps {
  options: string[]
  setValue: (value: string) => unknown
  value: string
}

export default function PaymentMethodSelector({ options, value, setValue }: PaymentMethodSelectorProps) {
  const { isOpen, onOpen, onClose } = useDisclose()

  // Change the payment method and close the action sheet
  function changePaymentMethod(value: string) {
    setValue(value)
    onClose()
  }

  return (
    <Fragment>
      <TouchableOpacity onPress={onOpen} style={styles.selectContainer}>
        <CreditCard />
        <View style={styles.selectButton}>
          <Text style={styles.selectTitle}>Payment card</Text>
          <Text style={styles.selectDescription}>Paying with {value}</Text>
        </View>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {options.map(option => (
            <Actionsheet.Item key={option} onPress={() => changePaymentMethod(option)}>
              <View style={styles.actionSheetItem}>
                <CreditCard />
                <Text style={styles.actionSheetItemLabel}>{option}</Text>
              </View>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}
