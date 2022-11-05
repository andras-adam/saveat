import { Fragment, useEffect } from 'react'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Buildings, ForkKnife, UserCircle } from 'phosphor-react-native'
import { NativeBaseProvider } from 'native-base'
import HomeScreen from './screens/Home/HomeScreen'
import ProfileScreen from './screens/Profile/ProfileScreen'
import RestaurantScreen from './screens/Restaurant/RestaurantScreen'
import RestaurantsScreen from './screens/Restaurants/RestaurantsScreen'
import OrderScreen from './screens/Order/OrderScreen'
import CheckoutScreen from './screens/Checkout/CheckoutScreen'
import CompletedSceen from './screens/Completed/CompletedScreen'


const colors = {
  menuItem: '#a49f9f',
  menuItemFocused: '#1794ff'
}

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tabs.Navigator defaultScreenOptions={{ tabBarActiveTintColor: colors.menuItemFocused }}>
              <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarIcon: ({ color }) => <Buildings color={color} /> }}
              />
              <Tabs.Screen
                name="Restaurants"
                component={RestaurantsScreen}
                options={{
                  tabBarIcon: ({ color }) => <ForkKnife color={color} />
                }}
              />
              <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarIcon: ({ color }) => <UserCircle color={color} /> }}
              />
            </Tabs.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Completed" component={CompletedSceen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {

  // Request location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access location was denied')
      }
    })()
  }, [])

  return (
    <Fragment>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
      <StatusBar style="auto" />
    </Fragment>
  )
}

registerRootComponent(App)
