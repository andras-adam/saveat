import { ScrollView } from 'native-base'
import { mockRestaurants, mockSavings } from '../../utils/mockData'
import RestaurantList from '../../components/RestaurantList'
import SavingsBanner from './SavingsBanner'


export default function HomeScreen() {
  return (
    <ScrollView>
      <SavingsBanner
        percentage={mockSavings.percentage}
        savedCO2={mockSavings.co2}
        savedMoney={mockSavings.money}
      />
      <RestaurantList small title="Offers" items={mockRestaurants} />
      <RestaurantList small title="Order again" items={mockRestaurants} />
      <RestaurantList small title="New restaurants" items={mockRestaurants} />
      <RestaurantList small title="Favorites" items={mockRestaurants} />
    </ScrollView>
  )
}
