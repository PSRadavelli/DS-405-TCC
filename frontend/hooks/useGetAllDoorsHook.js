import { smartboxApi } from '../api/smartbox.api'
import { useQuery } from 'react-query'

export const useGetAllDoorsHook = () => {
  const { data: doors, isLoading: isDoorsLoading, isSuccess: isDoorsSuccess } = useQuery(
    'doors',
    smartboxApi.getAllDoors
  )

  return {
    doors,
    isDoorsLoading,
    isDoorsSuccess
  }
}
