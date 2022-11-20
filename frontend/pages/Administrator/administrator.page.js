import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useGetAllUsersHook } from '../../hooks/useGetAllUsersHook'
import { useRequestNewDoorHook } from '../../hooks/useRequestNewDoorHook'
import { BaseView } from '../../components/BaseView/BaseView'
import { CustomButton } from '../../components/CustomButton/CustomButton'
import { InputLabel } from '../../components/InputLabel/InputLabel'

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10
  }
})

export const AdministratorPage = () => {
  const { users, isUsersLoading } = useGetAllUsersHook()
  const { requestNewDoor, newDoorRequest, setNewDoorRequest } = useRequestNewDoorHook()

  useEffect(() => {
    if (users) {
      setNewDoorRequest((prev) => ({
        ...prev,
        userId: users[0].userId
      }))
    }
  }, [users])

  useEffect(() => {
    if (newDoorRequest) {
      console.log(newDoorRequest)
    }
  }, [newDoorRequest])

  if (isUsersLoading) {
    return <Text>LOADING</Text>
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
      </View>
    </BaseView>
  )
}
