import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useGetAllUsersHook } from '../../hooks/useGetAllUsersHook'
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
  const [doorRequestDto, setDoorRequestDto] = useState({
    userId: 0,
    doorSize: ''
  })

  if (isUsersLoading) {
    return <Text>LOADING</Text>
  }

  return (
    <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ padding: 20 }}>
        <InputLabel>Usuário</InputLabel>
        <Picker
          style={{ ...styles.input, marginBottom: 20 }}
          selectedValue={doorRequestDto.userId}
          onValueChange={(itemValue) =>
            setDoorRequestDto((prev) => ({
              ...prev,
              userId: itemValue
            }))
          }>
          {users.map((user) => {
            return <Picker.Item label={`${user.name} ${user.surname}`} value={user.userId} key={user.userId} />
          })}
        </Picker>

        <InputLabel>Tamanho da porta</InputLabel>
        <Picker
          style={{ ...styles.input, marginBottom: 20 }}
          selectedValue={doorRequestDto.doorSize}
          onValueChange={(itemValue) =>
            setDoorRequestDto((prev) => ({
              ...prev,
              doorSize: itemValue
            }))
          }>
          <Picker.Item label="Grande" value="GRANDE" />
          <Picker.Item label="Pequena" value="PEQUENA" />
        </Picker>

        <CustomButton
          title="Salvar"
          onPress={() => {}}
          style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </View>
    </BaseView>
  )
}
