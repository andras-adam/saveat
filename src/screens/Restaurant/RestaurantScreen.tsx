import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function RestaurantScreen() {
  const { navigate } = useNavigation<any>()
  return (
    <View style={styles.container}>
      <Text>Restaurant</Text>
      <Button onPress={() => navigate('Order')}>Go to order</Button>
    </View>
  )
}
