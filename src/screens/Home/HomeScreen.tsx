import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}
