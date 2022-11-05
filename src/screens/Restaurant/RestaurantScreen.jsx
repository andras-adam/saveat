/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable react/prop-types */
import { Image, VStack, HStack, Card, Box, Input, Pressable, ScrollView, Center } from 'native-base'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Heart, MagnifyingGlass, SmileyMeh } from 'phosphor-react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getDishes, getRestaurant } from '../../api/firebaseHelper'
import { colors } from '../../assets/colors'
import FloatingButton from '../../components/FloatingButton'


const RestaurantHeaderImage = () => {
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width

  return (
    <VStack>
      <Image
        style={{ height: h / 6, width: w, borderRadius: 12 }}
        source={{
          uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }}
        alt="Restaurant header image"
        size="xl"
      ></Image>
    </VStack>
  )
}

const RestaurantName = ({ name }) => {
  return (
    <HStack paddingTop={5} paddingBottom={7} paddingX={2} justifyContent="space-between">
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{name}</Text>
      <Heart size={32} />
    </HStack>
  )
}

const MenuItem = ({ info, onSelect, isSelected }) => {
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width
  const color = isSelected ? colors.button : colors.tile

  return (
    <Pressable py={2} onPress={() => onSelect(info)}>
      <Card p={0} style={{ backgroundColor: colors.tile }} justifyContent="space-around">
        <VStack w={'100%'} alignItems='center'>
          <HStack w={'90%'} borderRadius={12} alignItems="center" justifyContent="space-between">
            <VStack pt={4} pb={2}>
              <HStack>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>{info.name}</Text>
                {info.isLeftover === true && <Image size={"5"} source={require('../../assets/leaf.png')} alt='leaf' />}
              </HStack>
              <Text style={{ fontSize: 10, width: w * 0.4, color: 'white', paddingVertical: 2 }}>{info.description}</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>{`${info.price} €`}</Text>
            </VStack>
            <Image
              style={{ aspectRatio: 5 / 4, width: w * 0.3 }}
              borderRadius={10}
              source={{
                uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
              }}
              alt="Restaurant header image"
              size="xl"
            ></Image>
          </HStack>
          <Box bgColor={color} w='95%' h={2} borderTopRadius={12} />
        </VStack>
      </Card>
    </Pressable>
  )
}

const SearchBar = () => {
  return (
    <Box alignItems="center" paddingBottom={5}>
      <Input mx="1" placeholder="Search..." w="80%" h={10} variant="rounded" InputLeftElement={<MagnifyingGlass size={20} />} />
    </Box>
  )
}

const MenuItemList = ({ data, onSelect, selected }) => {
  return (
    <VStack flex={1}>
      {data.map((element, index) => (
        <MenuItem
          key={index}
          info={element}
          onSelect={dish => onSelect(dish)}
          isSelected={selected.includes(element)}
        />
      ))}
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
})

export default function RestaurantScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const restaurantId = route.params.id
  const [ dishes, setDishes ] = useState([])
  const [ selected, setSelected ] = useState([])
  const [ restaurantInfo, setRestaurantInfo ] = useState()
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width

  const fetchDishes = useCallback(async () => {
    try {
      const result = await getDishes(restaurantId)
      setDishes(result)
    } catch (error) {
      console.error(error)
    }
  }, [ restaurantId ])

  const fetchRestaurant = useCallback(async () => {
    try {
      const restaurant = await getRestaurant(restaurantId)
      setRestaurantInfo(restaurant)
    } catch (error) {
      console.error(error)
    }
  }, [ restaurantId ])

  const onSelect = useCallback(dish => {
    setSelected(currentlySelected => {
      return currentlySelected.includes(dish)
        ? [ ...currentlySelected.filter(e => e !== dish) ]
        : [ ...currentlySelected, dish ]
    })
  }, [])

  useEffect(() => {
    fetchDishes()
    fetchRestaurant()
  }, [ fetchDishes, fetchRestaurant ])

  function getPrice() {
    return selected.map(element => element.price).reduce((partialSum, a) => partialSum + a, 0)
  }

  return (
    <View style={styles.container}>
      <ScrollView w='100%' height="100%">
        <VStack flex={1}>
          <RestaurantHeaderImage />
          {<RestaurantName name={restaurantInfo?.name}/>}
          <SearchBar />
          {
            (dishes.length === 0)
              ? (<Center flex={1} h={0.4 * h}>
                <VStack alignItems={'center'} space={6}>
                  <SmileyMeh size={50}/>
                  <Text>No items yet</Text>
                </VStack>
              </Center>
              )
              : <MenuItemList data={dishes} onSelect={dish => onSelect(dish)} selected={selected} />
          }
        </VStack>
      </ScrollView>
      {(selected.length > 0) && (
        <FloatingButton
          title={`View order — € ${getPrice()}`}
          onPress={() => navigation.navigate('Order', { dishes: selected })}
        />
      )}
    </View>
  )
}
