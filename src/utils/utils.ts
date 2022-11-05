import { OrderItem } from '../types/types'


// Get the total price of all items
export function getTotalPriceForOrderItems(items: OrderItem[]): number {
  const price = items.reduce((acc, cur) => acc + (cur.unitPrice * cur.amount), 0)
  return Math.round(price * 100) / 100
}

// Get the total count of all items
export function getTotalItemCountForOrderItems(items: OrderItem[]): number {
  return items.reduce((acc, cur) => acc + cur.amount, 0)
}
