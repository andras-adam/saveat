import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../hooks/useAuth'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function SignInScreen() {
  const { signin } = useAuth()
  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
      <Button title="Sign in" onPress={signin} />
    </View>
  )
}
