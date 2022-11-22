import React from 'react'
import { BaseView } from '../../components/BaseView/BaseView'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { CustomButton } from '../../components/CustomButton/CustomButton'

const Separator = () => (
  <View style={styles.separator} />
)

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '70%',
    fontSize: 20
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  button: {
    width: '50%'
  }
})

export default function LoginPage () {
  return (
    <BaseView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar/>
        <TextInput
            style={styles.input}
            placeholder='Login'
        />

        <Separator />

        <TextInput
            style={styles.input}
            placeholder='Senha'
        />

        <Separator />

        <CustomButton
            style={styles.button}
            title="Login"
            onPress={() => {}}
        />
    </View>
    </BaseView>
  )
}
