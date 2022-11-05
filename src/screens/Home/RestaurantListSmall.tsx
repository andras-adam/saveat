import { Fragment } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Restaurant } from '../../types/types'
import RestaurantListSmallItem from './RestaurantListSmallItem'


const styles = StyleSheet.create({
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingStart: 10
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  listSeparator: {
    width: 10
  }
})

interface RestaurantSmallListProps {
  title: string
  items: Restaurant[]
}

export default function RestaurantListSmall({ title, items }: RestaurantSmallListProps) {
  return (
    <Fragment>
      <Text style={styles.listTitle}>{title}</Text>
      <FlatList
        data={items}
        horizontal
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        renderItem={({ item, index }) => (
          <RestaurantListSmallItem key={index} item={item} />
        )}
      />
    </Fragment>
  )
}
