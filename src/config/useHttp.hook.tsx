import axios from "axios"
import { useMemo } from "react"

export const useHttp = () => {

  const API_URL = import.meta.env.VITE_API_URL
  const authorization = ''

  const axiosWrapper = useMemo(() => 
    axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        authorization
      }
    })
  , [authorization])

  return {
    http: axiosWrapper
  }
} 