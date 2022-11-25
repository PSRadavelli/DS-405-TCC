import { useState } from 'react'
import { useMutation } from 'react-query'
import { smartboxApi } from '../api/smartbox.api'

const initialNewUserDto = {
  name: '',
  surname: '',
  age: 0,
  telephone: '',
  email: '',
  admin: false,
  tagId: '',
  password: '',
  appNotification: true,
  emailNotification: true,
  intercomNotification: true
}

export const useNewUserHook = () => {
  const [newUserDto, setNewUserDto] = useState(initialNewUserDto)

  const { mutate: registerNewUser, isLoading: isNewUserLoading, isSuccess: isNewUserSuccess, isError: isNewUserError, error } = useMutation(
    smartboxApi.newUser(newUserDto),
    { onSuccess: () => setNewUserDto(initialNewUserDto) }
  )

  return {
    registerNewUser,
    isNewUserLoading,
    isNewUserSuccess,
    isNewUserError,
    error,
    newUserDto,
    setNewUserDto
  }
}
