import { smartboxApi } from '../api/smartbox.api'
import { useQuery } from 'react-query'

export const useGetAllUsersHook = () => {
  const { data: users, isLoading: isUsersLoading } = useQuery(
    'users',
    smartboxApi.getAllUsers
  )

  return {
    users,
    isUsersLoading
  }
}
