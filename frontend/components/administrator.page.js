import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useGetAllUsersHook } from '../hooks/useGetAllUsersHook'

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%'
  }
})

export const AdministratorPage = () => {
  const { users, isUsersLoading } = useGetAllUsersHook()
  const [doorRequestDto, setDoorRequestDto] = useState({
    userId: 0,
    doorSize: ''
  })

  if (isUsersLoading) {
    return 'LOADING'
  }

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Picker
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

        <Picker
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

        <Button
          title="Salvar"
          onPress={() => {}}
        />
      </View>
  )
}
