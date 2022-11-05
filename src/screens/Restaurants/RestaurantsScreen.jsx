/* eslint-disable react/prop-types */
import { FlatList } from 'native-base'
import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { getDishes, getRestaurants } from '../../api/firebaseHelper'
import RestaurantListItem from '../../components/RestaurantListItem'


const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  separator: {
    height: 10
  }
})

const RestaurantList = ({ data }) => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <RestaurantTile info={item} />}
    />
  )
}

const RestaurantTile = ({ info }) => {
  const [ hasLeftover, setHasLeftover] = useState(false)

  const checkHasLeftover = useCallback(async () => {
    const dishes = await getDishes(info.restaurantId)
    if (dishes.length === 0) {
      return
    }
    const leftoverCount = dishes.filter(dish => dish.isLeftover).length
    setHasLeftover(leftoverCount > 0)
  }, [ info.restaurantId ])

  useEffect(() => {
    checkHasLeftover()
  }, [ checkHasLeftover ])

  return (
    <RestaurantListItem
      item={{
        id: info.restaurantId,
        address: 'Leppävaarankatu 3-9, 02600 Espoo',
        title: info.name,
        distanceInMeters: 2500,
        timeInMinutes: 25,
        uri: info.picUrl,
        hasLeftover
      }}
    />
  )
}

export default function RestaurantsScreen() {
  const [ restaurants, setRestaurants ] = useState([])

  const fetchRestaurants = async () => {
    try {
      const restaurants = await getRestaurants()
      const ordered = restaurants.sort((a, b) => b.restaurantId.localeCompare(a.restaurantId))
      const data = ordered.map(element => {
        return {
          name: element.name,
          picUrl: element.picUrl,
          timeEstimate: [ 20, 35 ],
          restaurantId: element.restaurantId
        }
      })

      setRestaurants(data)
    } catch (error) {
      console.error('fetchRestaurants', error)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  return (
    <View style={styles.container}>
      <RestaurantList data={restaurants} />
    </View>
  )
}
