export interface OrderItem {
  amount: number
  id: string
  title: string
  unitPrice: number
  uri: string
}

export enum DeliveryMethod {
  Bicycle = 'Bicycle',
  Scooter = 'Scooter',
  Car = 'Car'
}

export interface Restaurant {
  id: string
  address: string
  title: string
  distanceInMeters: number
  timeInMinutes: number
  uri: string
  hasLeftover?: boolean
}
