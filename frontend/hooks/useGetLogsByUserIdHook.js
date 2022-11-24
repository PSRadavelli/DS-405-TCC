import { smartboxApi } from '../api/smartbox.api'
import { useQuery } from 'react-query'
import { getData } from '../util/asyncStorage'
import { useEffect, useState } from 'react'

export const useGetLogsByUserIdHook = () => {
  const [userId, setUserId] = useState()
  const [isQueryEnabled, setIsQueryEnabled] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      const userData = JSON.parse(await getData())

      if (userData) {
        setUserId(userData.user.userId)
        setIsQueryEnabled(true)
      }
    }

    getUserData()
  }, [])

  const { data: logs, isLoading: isLogsLoading, refetch } = useQuery(
    'logsByUserId',
    smartboxApi.getLogsByUserId(userId),
    { enabled: isQueryEnabled }
  )

  return {
    logs,
    isLogsLoading,
    refetch
  }
}
