import { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { getAuth } from 'firebase/auth'
import { app } from '../../../firebase'
import { useAuth } from '../../hooks/useAuth'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

function test() {
  // const auth = getAuth(app)
  // console.log(auth.app)
}

export default function SignInScreen() {
  const { signin } = useAuth()

  useEffect(() => {
    test()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
      <Button title="Sign in" onPress={signin} />
    </View>
  )
}
