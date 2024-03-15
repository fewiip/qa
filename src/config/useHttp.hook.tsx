import axios from "axios"
import { useMemo } from "react"
import { useAuthStore } from "../modules/auth/stores/useAuthStore.hook"

export const useHttp = () => {

  const API_URL = import.meta.env.VITE_API_URL
  const { token } = useAuthStore()

  const axiosWrapper = useMemo(() => 
    axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
  , [token])

  return {
    http: axiosWrapper
  }
} 