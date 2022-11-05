import { ScrollView } from 'native-base'
import { mockRestaurants, mockSavings } from '../../utils/mockData'
import RestaurantListSmall from './RestaurantListSmall'
import SavingsBanner from './SavingsBanner'


export default function HomeScreen() {
  return (
    <ScrollView>
      <SavingsBanner
        percentage={mockSavings.percentage}
        savedCO2={mockSavings.co2}
        savedMoney={mockSavings.money}
      />
      <RestaurantListSmall title="Offers" items={mockRestaurants} />
      <RestaurantListSmall title="Order again" items={mockRestaurants} />
      <RestaurantListSmall title="New restaurants" items={mockRestaurants} />
      <RestaurantListSmall title="Favorites" items={mockRestaurants} />
    </ScrollView>
  )
}
