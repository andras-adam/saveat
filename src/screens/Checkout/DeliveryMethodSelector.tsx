import { Actionsheet, useDisclose } from 'native-base'
import { Fragment } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Bicycle, Car } from 'phosphor-react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DeliveryMethod } from '../../types/types'


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

interface DeliveryMethodSelectorProps {
  setValue: (value: DeliveryMethod) => unknown
  value: DeliveryMethod
}

function getIcon(method: DeliveryMethod) {
  switch (method) {
    case DeliveryMethod.Bicycle: {
      return <Bicycle />
    }
    case DeliveryMethod.Scooter: {
      return <MaterialCommunityIcons name="scooter" size={24} color="black" />
    }
    case DeliveryMethod.Car: {
      return <Car weight="bold" />
    }
  }
}

export default function DeliveryMethodSelector({ value, setValue }: DeliveryMethodSelectorProps) {
  const { isOpen, onOpen, onClose } = useDisclose()

  // Change the delivery method and close the action sheet
  function changeDeliveryMethod(value: DeliveryMethod) {
    setValue(value)
    onClose()
  }

  return (
    <Fragment>
      <TouchableOpacity onPress={onOpen} style={styles.selectContainer}>
        {getIcon(value)}
        <View style={styles.selectButton}>
          <Text style={styles.selectTitle}>Delivery</Text>
          <Text style={styles.selectDescription}>Delivery by {value.toLowerCase()}</Text>
        </View>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {[ DeliveryMethod.Bicycle, DeliveryMethod.Scooter, DeliveryMethod.Car ].map(method => (
            <Actionsheet.Item key={method} onPress={() => changeDeliveryMethod(method)}>
              <View style={styles.actionSheetItem}>
                {getIcon(method)}
                <Text style={styles.actionSheetItemLabel}>{method}</Text>
              </View>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}
