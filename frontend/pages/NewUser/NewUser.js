import React, { useEffect, useState } from 'react'
import { TextInput, View, ActivityIndicator, StyleSheet, Text, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BaseView } from '../../components/BaseView/BaseView'
import { BaseModal } from '../../components/BaseModal/BaseModal'
import { useNewUserHook } from '../../hooks/useNewUserHook'
import { CustomButton } from '../../components/CustomButton/CustomButton'
import Checkbox from 'expo-checkbox'

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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 60
  },
  checkboxText: {
    fontSize: 16
  }
})

const Separator = () => (
  <View style={styles.separator} />
)

export const NewUser = () => {
  const {
    registerNewUser,
    isNewUserLoading,
    isNewUserSuccess,
    isNewUserError,
    error,
    newUserDto,
    setNewUserDto
  } = useNewUserHook()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    text: ''
  })

  useEffect(() => {
    if (isNewUserError) {
      if (error.message === '409') {
        setModalData({
          title: 'Erro!',
          text: 'O usuário inserido já existe!'
        })
      } else {
        setModalData({
          title: 'Erro!',
          text: 'Houve um erro ao criar o usuário!'
        })
      }

      openModalhandler()
    }
  }, [isNewUserError])

  useEffect(() => {
    if (isNewUserSuccess) {
      setModalData({
        title: 'Sucesso!',
        text: 'O usuário foi cadastrado com sucesso!'
      })
      openModalhandler()
    }
  }, [isNewUserSuccess])

  const openModalhandler = () => {
    setModalVisible(true)
  }

  const closenModalhandler = () => {
    setModalVisible(false)
  }

  if (isNewUserLoading) {
    return (
      <BaseView>
        <ActivityIndicator color='#005BEA' size={100} style={{ width: '100%', height: '100%' }} />
      </BaseView>
    )
  }

  return (
    <BaseView>
      <ScrollView style={{ flex: 1, paddingVertical: 50 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar/>

          <TextInput
            defaultValue={newUserDto.name}
            style={styles.input}
            placeholder='Nome'
            autoComplete='name'
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                name: text
              }))
            }}
          />

          <Separator />

          <TextInput
            defaultValue={newUserDto.surname}
            style={styles.input}
            placeholder='Sobrenome'
            autoComplete='name-family'
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                surname: text
              }))
            }}
          />

          <Separator />

          <TextInput
            defaultValue={newUserDto.age}
            style={styles.input}
            placeholder='Idade'
            keyboardType='numeric'
            maxLength={3}
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                age: text
              }))
            }}
          />

          <Separator />

          <TextInput
            defaultValue={newUserDto.telephone}
            style={styles.input}
            placeholder='Telefone'
            keyboardType='phone-pad'
            maxLength={11}
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                telephone: text
              }))
            }}
          />

          <Separator />

          <TextInput
            defaultValue={newUserDto.email}
            style={styles.input}
            placeholder='E-mail'
            keyboardType='email-address'
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                email: text
              }))
            }}
          />

          <Separator />

          <TextInput
            defaultValue={newUserDto.tagId}
            style={styles.input}
            placeholder='ID Tag'
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                tagId: text
              }))
            }}
          />

          <Separator />

          <TextInput
            defaultValue={newUserDto.password}
            style={styles.input}
            placeholder='Senha'
            secureTextEntry
            onChangeText={(text) => {
              setNewUserDto((prev) => ({
                ...prev,
                password: text
              }))
            }}
          />

          <Separator />

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>Receber notificação no App</Text>
            <Checkbox
              style={styles.checkbox}
              value={newUserDto.appNotification}
              color='#6B6B6B'
              onValueChange={(value) => {
                setNewUserDto((prev) => ({
                  ...prev,
                  appNotification: value
                }))
              }}
            />
          </View>

          <Separator />

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>Receber notificação por E-mail</Text>
            <Checkbox
              style={styles.checkbox}
              value={newUserDto.emailNotification}
              color='#6B6B6B'
              onValueChange={(value) => {
                setNewUserDto((prev) => ({
                  ...prev,
                  emailNotification: value
                }))
              }}
            />
          </View>

          <Separator />

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>Receber notificação por interfone</Text>
            <Checkbox
              style={styles.checkbox}
              value={newUserDto.intercomNotification}
              color='#6B6B6B'
              onValueChange={(value) => {
                setNewUserDto((prev) => ({
                  ...prev,
                  intercomNotification: value
                }))
              }}
            />
          </View>

          <Separator />

          <CustomButton
              style={styles.button}
              title="Salvar"
              onPress={registerNewUser}
          />

          <BaseModal
            title={modalData.title}
            text={modalData.text}
            isModalVisible={modalVisible}
            closeModal={closenModalhandler}
          />
        </ScrollView>
    </BaseView>
  )
}
