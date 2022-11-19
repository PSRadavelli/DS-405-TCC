import React from 'react'
import { StyleSheet } from 'react-native'
import LoginPage from './components/login.page'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterPage from './components/register.page'
import { AdministratorPage } from './components/administrator.page'
import { QueryClient, QueryClientProvider } from 'react-query'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
const Stack = createNativeStackNavigator()

const queryClient = new QueryClient()

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AdministratorPage"
            component={AdministratorPage}
            options={{ title: 'Administrador' }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ title: 'SmarBox' }}
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
