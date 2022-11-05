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
