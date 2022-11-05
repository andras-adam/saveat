import { OrderItem, Restaurant } from '../types/types'


const uri1 = 'https://www.onmanorama.com/content/dam/mm/en/food/features/images/2022/1/11/north-indian-cuisine.jpg.transform/onm-articleimage/image.jpg'
const uri2 = 'https://citinewsroom.com/wp-content/uploads/2021/07/Food.jpg'

// Mock savings data
export const mockSavings = { percentage: 75, co2: 1234, money: 123 }

// Mock restaurants
export const mockRestaurants: Restaurant[] = [
  { id: 'mock-0', title: 'Mumbai Delights', distanceInMeters: 2500, timeInMinutes: 20, address: '', uri: uri1 },
  { id: 'mock-1', title: 'Rolling Cow', distanceInMeters: 600, timeInMinutes: 10, address: '', uri: uri2 },
  { id: 'mock-2', title: 'Tako Loko', distanceInMeters: 4332, timeInMinutes: 45, address: '', uri: uri1 },
  { id: 'mock=3', title: 'Cracker Barrel', distanceInMeters: 1829, timeInMinutes: 15, address: '', uri: uri2 }
]

// Mock items
const mockOrderItems: OrderItem[] = [
  { id: '0', title: 'Salad', unitPrice: 5.99, amount: 1 },
  { id: '1', title: 'Rice', unitPrice: 4.25, amount: 1 },
  { id: '2', title: 'Beef', unitPrice: 12.49, amount: 1 }
]
