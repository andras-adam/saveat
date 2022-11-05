import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const styles = StyleSheet.create({
  actionButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  actionButton: {
    margin: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC4BC2'
  },
  actionButtonText: {
    color: '#ffffff',
    padding: 12
  }
})

interface FloatingButtonProps {
  title: string
  onPress: () => unknown
}

export default function FloatingButton({ title, onPress }: FloatingButtonProps) {
  return (
    <View style={styles.actionButtonContainer}>
      <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={onPress}>
        <Text style={styles.actionButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
