import { Fragment } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Restaurant } from '../../types/types'
import RestaurantListItem from './RestaurantListItem'


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
    width: 10,
    height: 10
  }
})

interface RestaurantSmallListProps {
  title?: string
  items: Restaurant[]
  small?: boolean
}

export default function RestaurantList({ title, items, small }: RestaurantSmallListProps) {
  return (
    <Fragment>
      {title && <Text style={styles.listTitle}>{title}</Text>}
      <FlatList
        data={items}
        horizontal={!!small}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        renderItem={({ item, index }) => (
          <RestaurantListItem key={index} item={item} small={small} />
        )}
      />
    </Fragment>
  )
}
