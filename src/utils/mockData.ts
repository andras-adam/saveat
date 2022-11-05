import { Restaurant } from '../types/types'


// Mock savings data
export const mockSavings = { percentage: 75, co2: 1234, money: 123 }

// Mock restaurants
export const mockRestaurants: Restaurant[] = [
  { id: '0', title: 'Mumbai Delights', color: '#932c2c', distanceInMeters: 2500, timeInMinutes: 20, address: '' },
  { id: '1', title: 'Rolling Cow', color: '#c26c26', distanceInMeters: 600, timeInMinutes: 10, address: '' },
  { id: '2', title: 'Tako Loko', color: '#e5e431', distanceInMeters: 4332, timeInMinutes: 45, address: '' },
  { id: '3', title: 'Cracker Barrel', color: '#99b41d', distanceInMeters: 1829, timeInMinutes: 15, address: '' }
]
