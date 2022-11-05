export interface OrderItem {
  amount: number
  id: string
  title: string
  unitPrice: number
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
  color: string
  distanceInMeters: number
  timeInMinutes: number
}
