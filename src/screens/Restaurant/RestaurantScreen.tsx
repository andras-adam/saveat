import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function RestaurantScreen() {
  return (
    <View style={styles.container}>
      <Text>Restaurant</Text>
    </View>
  )
}
