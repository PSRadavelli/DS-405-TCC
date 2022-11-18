import { StyleSheet} from 'react-native';
import LoginPage from './components/login.page';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './components/register.page';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{title:'Welcome'}}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{title:"Registre-se"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


