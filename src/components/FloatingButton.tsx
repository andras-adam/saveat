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
  actionButtonDisabled: {
    backgroundColor: '#a871a5'
  },
  actionButtonText: {
    color: '#ffffff',
    padding: 12
  }
})

interface FloatingButtonProps {
  title: string
  onPress: () => unknown
  disabled?: boolean
}

export default function FloatingButton({ title, onPress, disabled }: FloatingButtonProps) {
  return (
    <View style={styles.actionButtonContainer}>
      <TouchableOpacity
        style={[ styles.actionButton, disabled && styles.actionButtonDisabled ]}
        activeOpacity={0.8}
        onPress={disabled ? undefined : onPress}
      >
        <Text style={styles.actionButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
