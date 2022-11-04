import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function RestaurantsScreen() {
  return (
    <View style={styles.container}>
      <Text>Restaurants</Text>
    </View>
  )
}
