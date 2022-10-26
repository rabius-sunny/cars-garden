import { useEffect, useState } from 'react'
import requests from 'services/http'

type StatusType = 'idle' | 'pending' | 'success'
const useGet = (link: string, dep?: string, config?: object) => {
  const [data, setData] = useState<[] | null | any>(null)
  const [status, setStatus] = useState<StatusType>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStatus('pending')
    setData(null)
    setError(null)
    requests
      .get(`${process.env.REACT_APP_API_BASE_URL + link}`, config)
      .then(res => {
        setData(res.response)
        setStatus('success')
        setError(null)
      })
      .catch(err => {
        setError(err.response.data.message)
        setStatus('idle')
        setData(null)
      })
  }, [link, dep])

  return {
    data,
    error,
    loading: status === 'pending',
    success: status === 'success'
  }
}

export default useGet
