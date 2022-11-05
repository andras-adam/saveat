import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Restaurant } from '../types/types'


const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#3F3244',
    elevation: 2
  },
  cardContainerSmall: {
    width: 150
  },
  cardBanner: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  cardBannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#dddddd',
    paddingEnd: 6
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardDetailsText: {
    fontSize: 12,
    paddingTop: 2,
    color: '#dddddd'
  }
})

interface RestaurantListSmallItemProps {
  item: Restaurant
  small?: boolean
}

export default function RestaurantListItem({ item, small }: RestaurantListSmallItemProps) {
  const { navigate } = useNavigation<any>()
  return (
    <TouchableOpacity
      style={[ styles.cardContainer, small && styles.cardContainerSmall ]}
      activeOpacity={0.8}
      onPress={() => navigate('Restaurant', { id: item.id })}
    >
      <View style={styles.cardBanner}>
        <Image style={styles.cardBannerImage} source={{ uri: item.uri }} alt="Restaurant thumbnail" />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {/* eslint-disable-next-line unicorn/prefer-module */}
          {item.hasLeftover && <Image size={5} source={require('../assets/leaf.png')} alt="Leftover symbol" />}
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailsText}>{Math.round(item.distanceInMeters / 100) / 10} km</Text>
          <Text style={styles.cardDetailsText}>{item.timeInMinutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
