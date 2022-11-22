import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useGetAllUsersHook } from '../../hooks/useGetAllUsersHook'
import { useRequestNewDoorHook } from '../../hooks/useRequestNewDoorHook'
import { BaseView } from '../../components/BaseView/BaseView'
import { CustomButton } from '../../components/CustomButton/CustomButton'
import { InputLabel } from '../../components/InputLabel/InputLabel'
import { BaseModal } from '../../components/BaseModal/BaseModal'

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
    height: '35%',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    elevation: 2,
    marginTop: 10
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textTitle: {
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16
  },
  input: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10
  }
})

export const AdministratorPage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    text: ''
  })
  const { users, isUsersLoading } = useGetAllUsersHook()
  const {
    requestNewDoor,
    newDoorRequest,
    setNewDoorRequest,
    isDoorRequestLoading,
    isDoorRequestSuccess,
    isDoorRequestError,
    error
  } = useRequestNewDoorHook()

  useEffect(() => {
    if (users) {
      setNewDoorRequest((prev) => ({
        ...prev,
        userId: users[0].userId
      }))
    }
  }, [users])

  useEffect(() => {
    if (isDoorRequestSuccess) {
      setModalData({
        title: 'Sucesso!',
        text: 'Aguarde a abertura automática da porta'
      })
      openModalhandler()
    }
  }, [isDoorRequestSuccess])

  useEffect(() => {
    if (isDoorRequestError) {
      if (error.message === '412') {
        setModalData({
          title: 'Erro!',
          text: 'Não há portas disponíveis com o tamanho solicitado'
        })
      } else {
        setModalData({
          title: 'Erro!',
          text: 'Houve um erro na requisição da porta'
        })
      }

      openModalhandler()
    }
  }, [isDoorRequestError])

  const openModalhandler = () => {
    setModalVisible(true)
  }

  const closenModalhandler = () => {
    setModalVisible(false)
  }

  if (isUsersLoading || isDoorRequestLoading) {
    return (
      <BaseView>
        <ActivityIndicator color='#005BEA' size={100} style={{ width: '100%', height: '100%' }} />
      </BaseView>
    )
  }

  return (
    <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ padding: 20 }}>
        <InputLabel>Usuário</InputLabel>
        <Picker
          style={{ ...styles.input, marginBottom: 20 }}
          selectedValue={newDoorRequest.userId}
          onValueChange={(itemValue) =>
            setNewDoorRequest((prev) => ({
              ...prev,
              userId: itemValue
            }))
          }>
          {users.map((user) => {
            return <Picker.Item label={`${user.name} ${user.surname}`} value={user.userId} key={user.userId} />
          })}
        </Picker>

        <InputLabel>Tamanho do armário</InputLabel>
        <Picker
          style={{ ...styles.input, marginBottom: 20 }}
          selectedValue={newDoorRequest.size}
          onValueChange={(itemValue) => {
            setNewDoorRequest((prev) => ({
              ...prev,
              size: itemValue
            }))
          }
          }>
          <Picker.Item label="Grande" value="GRANDE" />
          <Picker.Item label="Pequeno" value="PEQUENO" />
        </Picker>

        <CustomButton
          title="Salvar"
          onPress={requestNewDoor}
          style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
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
