/* eslint-disable react/prop-types */
import { useNavigation } from '@react-navigation/native'
import { Card, FlatList, HStack, Image, Pressable, Spacer, VStack, Text } from 'native-base'
import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../assets/colors'
import { getDishes, getRestaurants } from '../../api/firebaseHelper'


const defaultImage = 'https://citinewsroom.com/wp-content/uploads/2021/07/Food.jpg'

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

const RestaurantList = ({ data }) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index} data={data} renderItem={({ item }) => <RestaurantTile info={item} />}
    />
  )
}

const RestaurantTile = ({ info }) => {
  const [ hasLeftover, setHasLeftover] = useState(false)
  const navigation = useNavigation()

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
    <Pressable py={2} onPress={() => navigation.navigate('Restaurant', { restaurantId: info.restaurantId })}>
      <Card borderRadius={12} width={'100%'} shadow={'4'} bgColor={colors.tile} m={0} p={0}>
        <VStack p={2}>
          <Image borderRadius={12} w={'100%'} h={'100'} source={{ uri: info.picUrl }} alt="food" />
          <Spacer h={2} />
          <HStack justifyContent={'space-between'} py={1}>
            <HStack>
              <Text color={'white'}>{info.name}</Text>
              {hasLeftover && <Image size={"5"} source={require('../../assets/leaf.png')} alt='leaf' />}
            </HStack>
            <Text color={'white'}>{`${info.timeEstimate[0]} - ${info.timeEstimate[1]} min`}</Text>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  )
}

export default function RestaurantsScreen() {
  const [ restaurants, setRestaurants ] = useState()

  const fetchRestaurants = async () => {
    try {
      const restaurants = await getRestaurants()

      const data = restaurants.map(element => {
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
      <Text>All restaurants</Text>
      {restaurants && <RestaurantList data={restaurants} />}
    </View>
  )
}
