import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { registerRootComponent } from 'expo'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function App() {
  return (
    <View style={styles.container}>
      <Text>Save it!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

registerRootComponent(App)
