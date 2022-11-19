import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TextInput, Button } from 'react-native'

const Separator = () => (
  <View style={styles.separator} />
)

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default function LoginPage({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar/>
      <TextInput
          style={styles.input}
          placeholder='Login' 
      />
      <TextInput
          style={styles.input}
          placeholder='Senha'
      />
      <Separator />
      <Button
          title="Login"
          onPress={() => navigation.navigate('Homepage', { name: 'lol' })}
      />
      <Button
          title="Registrar-se"
          onPress={() =>
            navigation.navigate('RegisterPage', { name: 'Jane' })
          }
      />
  </View>
  )
}

