import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../hooks/useAuth'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function ProfileScreen() {
  const { signout } = useAuth()
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Sign out" onPress={signout} />
    </View>
  )
}
