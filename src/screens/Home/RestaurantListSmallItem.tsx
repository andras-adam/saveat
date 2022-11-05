import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Restaurant } from '../../types/types'


const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 2
  },
  cardBanner: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

interface RestaurantListSmallItemProps {
  item: Restaurant
}

export default function RestaurantListSmallItem({ item }: RestaurantListSmallItemProps) {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={[ styles.cardBanner, { backgroundColor: item.color }]} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardDetails}>
          <Text>{Math.round(item.distanceInMeters / 100) / 10} km</Text>
          <Text>{item.timeInMinutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
