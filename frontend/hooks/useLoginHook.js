import { useState } from 'react'
import { smartboxApi } from '../api/smartbox.api'
import { useMutation } from 'react-query'
import { storeData } from '../util/asyncStorage'
import { useNavigation } from '@react-navigation/native'
import { registerIndieID } from 'native-notify'

export const useLoginHook = () => {
  const navigation = useNavigation()
  const [loginDto, setLoginDto] = useState({
    email: '',
    password: ''
  })

  const onSuccessCallback = async (value) => {
    navigation.navigate('HomePage')
    await registerIndieID(String(value.user.userId), 4976, 'cB3EX57tZ8TXuCgDiyx07U').then(console.log('Push notification ID registered'))
    await storeData(JSON.stringify(value))
  }

  const { mutate: login, data: loginData, isLoading: isLoginLoading, isSuccess: isLoginSuccess, isError: isLoginError, error } = useMutation(
    smartboxApi.login(loginDto),
    { onSuccess: (value) => onSuccessCallback(value) }
  )

  return {
    login,
    loginData,
    isLoginLoading,
    isLoginSuccess,
    isLoginError,
    error,
    loginDto,
    setLoginDto
  }
}
