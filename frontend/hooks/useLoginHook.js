import { useState } from 'react'
import { smartboxApi } from '../api/smartbox.api'
import { useMutation } from 'react-query'
import { storeData } from '../util/asyncStorage'

export const useLoginHook = () => {
  const [loginDto, setLoginDto] = useState({
    email: '',
    password: ''
  })

  const onSuccessCallback = async (value) => {
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
