import { ScrollView } from 'native-base'
import { Restaurant } from '../../types/types'
import RestaurantListSmall from './RestaurantListSmall'
import SavingsBanner from './SavingsBanner'


export default function HomeScreen() {
  // Mock savings data
  const mockSavings = { percentage: 75, co2: 1234, money: 123 }

  // Mock restaurants
  const mockRestaurants: Restaurant[] = [
    { id: '0', title: 'Mumbai Delights', color: '#932c2c', distanceInMeters: 2500, timeInMinutes: 20, address: '' },
    { id: '1', title: 'Rolling Cow', color: '#c26c26', distanceInMeters: 600, timeInMinutes: 10, address: '' },
    { id: '2', title: 'Tako Loko', color: '#e5e431', distanceInMeters: 4332, timeInMinutes: 45, address: '' },
    { id: '3', title: 'Cracker Barrel', color: '#99b41d', distanceInMeters: 1829, timeInMinutes: 15, address: '' }
  ]

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
