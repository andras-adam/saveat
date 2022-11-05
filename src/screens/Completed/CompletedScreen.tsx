import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CheckCircle } from 'phosphor-react-native'


const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  content: {
    padding: 32,
    margin: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20
  },
  icon: {
    paddingTop: 10,
    marginBottom: 20
  },
  description: {
    paddingBottom: 20
  },
  button: {
    margin: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC4BC2',
    paddingHorizontal: 32
  },
  buttonText: {
    color: '#ffffff',
    padding: 12
  }
})

export default function CompletedSceen() {
  const navigation = useNavigation<any>()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Success!</Text>
        <CheckCircle color="#19ff19" weight="bold" size={32} style={styles.icon} />
        <Text style={styles.description}>Your order will be delivered soon.</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
