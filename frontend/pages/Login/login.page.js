import React, { useEffect, useState } from 'react'
import { BaseView } from '../../components/BaseView/BaseView'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native'
import { CustomButton } from '../../components/CustomButton/CustomButton'
import { useLoginHook } from '../../hooks/useLoginHook'
import { BaseModal } from '../../components/BaseModal/BaseModal'

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
  const {
    login,
    loginData,
    isLoginLoading,
    isLoginError,
    error,
    loginDto,
    setLoginDto
  } = useLoginHook()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    text: ''
  })

  useEffect(() => {
    if (isLoginError) {
      if (error.message === '403' || error.message === '500') {
        setModalData({
          title: 'Erro!',
          text: 'Usuário ou senha inválidos'
        })
      } else {
        setModalData({
          title: 'Erro!',
          text: 'Houve um erro no Login'
        })
      }

      openModalhandler()
    }
  }, [isLoginError])

  const openModalhandler = () => {
    setModalVisible(true)
  }

  const closenModalhandler = () => {
    setModalVisible(false)
  }

  if (isLoginLoading) {
    return (
      <BaseView>
        <ActivityIndicator color='#005BEA' size={100} style={{ width: '100%', height: '100%' }} />
      </BaseView>
    )
  }

  return (
    <BaseView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar/>
        <TextInput
          defaultValue={loginDto.email}
          style={styles.input}
          placeholder='E-mail'
          autoComplete='email'
          onChangeText={(text) => {
            setLoginDto((prev) => ({
              ...prev,
              email: text
            }))
          }}
        />

        <Separator />

        <TextInput
          defaultValue={loginDto.password}
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          autoComplete='password'
          onChangeText={(text) => {
            setLoginDto((prev) => ({
              ...prev,
              password: text
            }))
          }}
        />

        <Separator />

        <CustomButton
            style={styles.button}
            title="Login"
            onPress={login}
        />

        <BaseModal
          title={modalData.title}
          text={modalData.text}
          isModalVisible={modalVisible}
          closeModal={closenModalhandler}
        />
      </View>
    </BaseView>
  )
}
