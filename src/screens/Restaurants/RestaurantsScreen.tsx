import { useNavigation } from '@react-navigation/native'
import { Card, FlatList, HStack, Image, Pressable, Spacer, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

interface RestaurantInfo {
  name: 'Unknown'
  picId: 'default'
  restaurantId: '0'
  timeEstimate: [0, 0]
}

const RestaurantList = (data: [RestaurantInfo]) => {
  return (
    <FlatList
      keyExtractor={item => item.restaurantId} data={data} renderItem={({ item }) => RestaurantTile(item)}
    />
  )
}

const RestaurantTile = (info: RestaurantInfo) => {
  const navigation = useNavigation<any>()


  return (
    <Pressable onPress={() => navigation.navigate('Restaurant', { restaurantId: info.restaurantId })}>
      <Card borderRadius={12} width={'100%'}>
        <VStack p={8}>
          <Image />
          <Spacer h={8} />
          <HStack justifyContent={'space-between'}>
            <Text>{info.name}</Text>
            <Text>{`${info.timeEstimate[0]} - ${info.timeEstimate[1]} min`}</Text>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  )
}

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<[RestaurantInfo]?>()

  const fetchRestaurants = async () => {
    try {
      const restaurants = await 
    } catch (error) {
      
    }
  }

  return (
    <View style={styles.container}>
      <Text>All restaurants</Text>
      {restaurants && <RestaurantList data={restaurants} />}
    </View>
  )
}
