import { useHttp } from "../../../config/useHttp.hook"

interface LoginResponse {
  data: {
    token: string
  }
}

export const useAuth = () => {

  const { http } = useHttp()
  
  const login = (email: string, password: string): Promise<LoginResponse> => {
    
     return http.post('/auth/signin', { email, password })
  }

  return {
    login
  }
}