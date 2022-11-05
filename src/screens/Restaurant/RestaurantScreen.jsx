import { Image, VStack, HStack, Card, Box, Input, FlatList, Pressable } from 'native-base'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Heart, MagnifyingGlass } from 'phosphor-react-native'


const RestaurantHeaderImage = () => {
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width


  return (
    <VStack>
      <Text></Text>
      <Image
        style={{ height: h / 4, width: w}}
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
    <HStack paddingTop={5} paddingBottom={7} paddingX={2} justifyContent= "space-between">
      <Text style={{fontSize: 30, fontWeight: "bold"}}>Name</Text>
      <Heart size={32}/>
    </HStack>
  )
}

const MenuItem = (info) => {
  const h = Dimensions.get('window').height
  const w = Dimensions.get('window').width

  return (
    <Pressable onPress={() => {//TODO}}>
      <Card style={{ backgroundColor: '#DDDDD8' }} justifyContent="space-around">
        <HStack  borderRadius={10} alignItems="center" justifyContent="space-between">
          <VStack space={1} height={90}>
            <Text style={{fontSize:16, fontWeight: "500"}}>Dish name</Text>
            <Text style={{ fontSize: 10, width: w * 0.4 }}>A brief description of the dish and what it contains,
            and a bunch of other things the customer wont read because they care more about the pic.</Text>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>0.00€</Text>
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
      </Card>
    </Pressable>
  )
}

const SearchBar = () => {
  return (
    <Box alignItems="center" paddingBottom={5}>
      <Input mx="1" placeholder="Search..." w="80%" h={10} variant="rounded" InputLeftElement={<MagnifyingGlass size={20}/>}
      />
    </Box>
  )
}

const MenuItemList = ({ menu }) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index} data={menu} renderItem={({ item }) => <MenuItem info={item} />}/>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default function RestaurantScreen() {
  return (
    <View style={styles.container}>
      <RestaurantHeaderImage />
      <RestaurantName/>
      <SearchBar/>
      <MenuItemList/>
    </View>
  )
}

const menu = [
  {name: 'Food item',
  description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
  price: '0.00€'
  },

  {name: 'Food item',
  description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
  price: '0.00€'
  },

  {name: 'Food item',
  description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
  price: '0.00€'
  },

  {name: 'Food item',
  description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
  price: '0.00€'
  },

  {name: 'Food item',
  description: 'A brief description of the dish and what it contains, and a bunch of other things the customer wont read because they care more about the pic',
  price: '0.00€'
  }
]