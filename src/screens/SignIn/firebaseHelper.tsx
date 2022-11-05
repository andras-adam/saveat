/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable sort-keys */
// This if here because chanign the order in which the functions are exported is cumbersome and time consuming
import { getFirestore, collection, addDoc, GeoPoint, getDocs, doc, getDoc, setDoc, initializeFirestore, Firestore, updateDoc } from 'firebase/firestore'
import { getStorage, getStream, ref} from 'firebase/storage'
import { app } from '../../../firebase'


const db = getFirestore(app)
const storage = getStorage(app)

//  Adding datatypes
interface UserDataType {
  email: string
  geopoint?: GeoPoint
  location?: string
  name: string
  phoneno: string
  type: boolean
}

interface DishDataType {
  amount: number
  category: string
  discount: number
  description: string
  name: string
  price: number
}
interface OrderDataType {
  clientID: string
  dishID: string
  estimatedTime: number
  restaurantid: string
  status: boolean
  transport: string
}
interface RestaurantDataType {
  restaurantId: string
  geopoint: GeoPoint
  location: string
  name: string
  ownerid: string
  picUrl: string
}
const addUser = async (userData: UserDataType) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      email: userData.email,
      geopoint: userData.geopoint,
      location: userData.location,
      name: userData.name,
      phoneno: userData.phoneno,
      type: true
    })
    console.log('Document written with ID:', docRef.id)
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'))
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
  return querySnapshot.forEach(element => element.data() as UserDataType)
}

const getUser = async (id: string) => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as UserDataType
}

const addDish = async (dish: DishDataType, restaurantId: string) => {
  try {
    const docRef = await addDoc(collection(db, 'restaurants', restaurantId, 'dish'), {
      amount: dish.amount,
      category: dish.category,
      discount: dish.discount,
      description: dish.description,
      name: dish.name,
      price: dish.price
    })
    console.log('Document written with ID:', docRef.id)
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

const getDishes = async (restaurantId: string) => {
  const querySnapshot = await getDocs(collection(db, 'restaurants', restaurantId, 'dish'))
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
  const dishes = querySnapshot.docs.map(element => element.data() as DishDataType)
  return dishes
}

const getDish = async (id: string) => {
  const docRef = doc(db, 'dishes', id)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as RestaurantDataType
}

const addOrder = async (order: OrderDataType) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      clientID: order.clientID,
      dishID: order.dishID,
      estimatedTime: order.estimatedTime,
      restaurantid: order.restaurantid,
      status: order.status,
      transport: order.transport
    })
    console.log('Document written with ID:', docRef.id)
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

const getOrders = async () => {
  const querySnapshot = await getDocs(collection(db, 'orders'))
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
  return querySnapshot.forEach(element => element.data() as OrderDataType)
}

const getOrder = async (id: string) => {
  const docRef = doc(db, 'orders', id)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as OrderDataType
}

const addRestaurant = async (restaurant: RestaurantDataType) => {
  try {
    const docRef = await addDoc(collection(db, 'restaurants'), {
      restaurantId: "0",
      geopoint: restaurant.geopoint,
      location: restaurant.location,
      name: restaurant.name,
      ownerid: restaurant.ownerid,
      picUrl: restaurant.picUrl
    })
    await updateDoc(docRef, { restaurantId: docRef })
    console.log('Document written with ID:', docRef.id)
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

const getRestaurants = async () => {
  const querySnapshot = await getDocs(collection(db, 'restaurants'))
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
  const restaurants = querySnapshot.docs.map(element => element.data() as RestaurantDataType)
  return restaurants
}

const getRestaurant = async (id: string) => {
  const docRef = doc(db, 'restaurants', id)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as RestaurantDataType
}

export {
  addDish, addOrder, addUser, getDish, getDishes, getUser,
  getOrder, getUsers, getOrders, addRestaurant, getRestaurant, getRestaurants
}
