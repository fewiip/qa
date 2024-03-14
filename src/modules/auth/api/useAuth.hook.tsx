import { useHttp } from "../../../config/useHttp.hook"

export const useAuth = () => {

  const { http } = useHttp()
  
  const login = (email: string, password: string) => {
    return http.post('/auth/signin', { email, password })
  }
  
  return {
    login
  }
}