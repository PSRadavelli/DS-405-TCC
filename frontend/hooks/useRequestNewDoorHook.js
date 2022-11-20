import { useState } from 'react'
import { useMutation } from 'react-query'
import { smartboxApi } from '../api/smartbox.api'

export const useRequestNewDoorHook = () => {
  const [newDoorRequest, setNewDoorRequest] = useState({
    userId: 0,
    size: 'GRANDE'
  })

  const {
    mutate: requestNewDoor,
    isSuccess: isDoorRequestSuccess,
    isLoading: isDoorRequestLoading,
    isError: isDoorRequestError
  } = useMutation(smartboxApi.requireDoor(newDoorRequest))

  return {
    isDoorRequestSuccess,
    isDoorRequestLoading,
    isDoorRequestError,
    requestNewDoor,
    setNewDoorRequest,
    newDoorRequest
  }
}
