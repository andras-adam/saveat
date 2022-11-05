import { Fragment } from 'react'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Buildings, ForkKnife, MagnifyingGlass, UserCircle } from 'phosphor-react-native'
import React from 'react'
import SignInScreen from './screens/SignIn/SignInScreen'
import HomeScreen from './screens/Home/HomeScreen'
import SearchScreen from './screens/Search/SearchScreen'
import ProfileScreen from './screens/Profile/ProfileScreen'
import RestaurantScreen from './screens/Restaurant/RestaurantScreen'
import RestaurantsScreen from './screens/Restaurants/RestaurantsScreen'
import CheckoutScreen from './screens/Checkout/CheckoutScreen'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { Box, extendTheme, NativeBaseProvider } from 'native-base'


const colors = {
  menuItem: '#a49f9f',
  menuItemFocused: '#1794ff'
}

const Unauthenticated = createNativeStackNavigator()
const Authenticated = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

function Navigation() {
  const { isAuthenticated } = useAuth()
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Unauthenticated.Navigator>
          <Unauthenticated.Screen name="SignIn" component={SignInScreen} />
        </Unauthenticated.Navigator>
      ) : (
        <Authenticated.Navigator>
          <Authenticated.Screen name="Main" options={{ headerShown: false }}>
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
                  name="Search"
                  component={SearchScreen}
                  options={{ tabBarIcon: ({ color }) => <MagnifyingGlass color={color} /> }}
                />
                <Tabs.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{ tabBarIcon: ({ color }) => <UserCircle color={color} /> }}
                />
              </Tabs.Navigator>
            )}
          </Authenticated.Screen>
          <Unauthenticated.Screen name="Restaurant" component={RestaurantScreen} />
          <Unauthenticated.Screen name="Checkout" component={CheckoutScreen} />
        </Authenticated.Navigator>
      )}
    </NavigationContainer>
  )
}

function App() {
  return (
    <NativeBaseProvider>
      <Fragment>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
        <StatusBar style="auto" />
      </Fragment>
    </NativeBaseProvider>
  )
}

registerRootComponent(App)
