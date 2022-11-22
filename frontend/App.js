import React from 'react'
import LoginPage from './pages/Login/login.page'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterPage from './pages/Register/register.page'
import { AdministratorPage } from './pages/Administrator/administrator.page'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HomePage } from './pages/HomePage/HomePage'

const Stack = createNativeStackNavigator()

const queryClient = new QueryClient()

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ title: 'SmartBox' }}
            />

            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ title: 'SmartBox' }}
            />

            <Stack.Screen
              name="AdministratorPage"
              component={AdministratorPage}
              options={{ title: 'Requisitar nova porta' }}
            />

            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{ title: 'Registre-se' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </QueryClientProvider>
  )
}
