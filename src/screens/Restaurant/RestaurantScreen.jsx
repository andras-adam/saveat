/* eslint-disable react/prop-types */
import { Image, VStack, HStack, Card, Box, Input, FlatList, Pressable, ScrollView, ZStack, Spacer, Center } from 'native-base'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Heart, MagnifyingGlass } from 'phosphor-react-native'
import { addDish, getDishes } from '../SignIn/firebaseHelper'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../../assets/colors'


const RestaurantHeaderImage = () => {
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width


  return (
    <VStack>
      <Text></Text>
      <Image
        style={{ height: h / 6, width: w }}
        source={{
          uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        }}
        alt="Restaurant header image"
        size="xl"
      ></Image>
    </VStack>
  )
}

const RestaurantName = () => {
  return (
    <HStack paddingTop={5} paddingBottom={7} paddingX={2} justifyContent="space-between">
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Name</Text>
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
          <HStack w={'90%'} borderRadius={10} alignItems="center" justifyContent="space-between">
            <VStack pt={4} pb={2}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: 'white' }}>{info.name}</Text>
              <Text style={{ fontSize: 10, width: w * 0.4, color: 'white', paddingVertical: 2 }}>{info.description}</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>{`${info.price} €`}</Text>
            </VStack>
            <Image
              style={{ aspectRatio: 5 / 4, width: w * 0.3 }}
              borderRadius={10}
              source={{
                uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
      <Input mx="1" placeholder="Search..." w="80%" h={10} variant="rounded" InputLeftElement={<MagnifyingGlass size={20} />}
      />
    </Box>
  )
}

const MenuItemList = ({ data, onSelect, selected }) => {
  return (
    // <FlatList
    //   keyExtractor={(item, index) => index} data={data} renderItem={({ item }) => <MenuItem info={item} />} />
    <VStack flex={1}>
      {
        data.map((element, index) => {
          return <MenuItem key={index} info={element} onSelect={dish => onSelect(dish)} isSelected={selected.includes(element)} />
        })
      }

    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})


const menu = [
  {
    name: 'Food item',
    description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
    price: '0.00€'
  },

  {
    name: 'Food item',
    description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
    price: '0.00€'
  },

  {
    name: 'Food item',
    description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
    price: '0.00€'
  },

  {
    name: 'Food item',
    description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
    price: '0.00€'
  },

  {
    name: 'Food item',
    description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
    price: '0.00€'
  }
]

const BottomButton = ({ selectedItems, onPress }) => {
  const total = selectedItems.map(element => element.price).reduce((partialSum, a) => partialSum + a, 0)

  return (
    <Pressable onPress={() => onPress()} w={'100%'} >
      <Card borderRadius={12} w='100%' bgColor={colors.button}>
        <HStack alignItems={'center'}>
          <Card borderRadius={'100%'} p={3} bgColor={'black'} mr={6}>
            <Center w={3} height={3}>
              <Text style={{ fontWeight: 'bold', color: colors.button }}>{selectedItems.length}</Text>
            </Center>
          </Card>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: '22' }}>View order</Text>
          <Spacer flex={1} />
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: '22' }}>{`${total}€`}</Text>
        </HStack>
      </Card>
    </Pressable>
  )
}


export default function RestaurantScreen() {
  const navigation = useNavigation()
  const [dishes, setDishes] = useState()
  const [selected, setSelected] = useState([])
  const route = useRoute()
  const restaurantId = route.params.restaurantId
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width

  const fetchDishes = async () => {
    try {
      const dishes = await getDishes(restaurantId)
      setDishes(dishes)
    } catch (error) {
      console.error(error)
    }
  }

  const onSelect = (dish) => {
    if (selected.includes(dish)) {
      setSelected([...selected.filter(e => e !== dish)])
    } else {
      setSelected([...selected, dish])
    }
  }

  // const insertDish = async (menu) => {
  //   try {
  //     const data = {
  //       amount: 1,
  //       category: "food",
  //       discount: "0.3",
  //       description: menu.description,
  //       name: menu.name,
  //       price: menu.price
  //     }
  //     await addDish(data, 'adozznOOPHHmHzcW0yxj')
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    // menu.forEach(element => {
    //   insertDish(element)
    // })
    fetchDishes()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView w='100%' height="100%">
        <VStack flex={1}>
          <RestaurantHeaderImage />
          <RestaurantName />
          <SearchBar />
          {dishes && <MenuItemList data={dishes} onSelect={dish => onSelect(dish)} selected={selected} />}
        </VStack>
      </ScrollView>
      {(selected.length > 0) && (
        <Center w={w} px={4} style={{ position: 'absolute', bottom: 10 }} >
          <BottomButton style={{ width: '100%' }} selectedItems={selected} onPress={ () => navigation.navigate('Order', {dishes: selected}) } />
        </Center>
      )}
    </View>
  )
}
