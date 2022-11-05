import { StyleSheet, Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'


const styles = StyleSheet.create({
  savingsContainer: {
    height: 200,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 32,
    margin: 10,
    marginTop: 15,
    backgroundColor: '#aeffad',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  savingsPercentage: {
    fontWeight: 'bold'
  },
  savingsStatistics: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#a0d79f'
  },
  savingsTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    paddingTop: 10
  },
  savingsText: {
    color: '#ffffff'
  }
})

interface SavingsBannerProps {
  percentage: number
  savedCO2: number
  savedMoney: number
}

export default function SavingsBanner({ percentage, savedCO2, savedMoney }: SavingsBannerProps) {
  return (
    <View style={styles.savingsContainer}>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={percentage}
        tintColor="#48483F"
        backgroundColor="#D1D1CE"
      >
        {fill => <Text style={styles.savingsPercentage}>{fill}%</Text>}
      </AnimatedCircularProgress>
      <View style={styles.savingsStatistics}>
        <Text style={styles.savingsTitle}>CO2 saved</Text>
        <Text style={styles.savingsText}>{savedCO2} unit</Text>
        <Text style={styles.savingsTitle}>Money saved</Text>
        <Text style={styles.savingsText}>€ {savedMoney}</Text>
      </View>
    </View>
  )
}
