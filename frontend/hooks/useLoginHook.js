import { useState } from 'react'
import { smartboxApi } from '../api/smartbox.api'
import { useMutation } from 'react-query'

export const useLoginHook = () => {
  const [loginDto, setLoginDto] = useState({
    email: '',
    password: ''
  })
  const { mutate: login, data: loginData, isLoading: isLoginLoading, isError: isLoginError, error } = useMutation(
    smartboxApi.login(loginDto)
  )

  return {
    login,
    loginData,
    isLoginLoading,
    isLoginError,
    error,
    loginDto,
    setLoginDto
  }
}
