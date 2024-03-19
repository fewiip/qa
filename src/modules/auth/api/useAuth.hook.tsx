import { useHttp } from "../../../config/useHttp.hook"

interface LoginResponse {
  data: {
    token: string
  }
}

export interface SignUpProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useAuth = () => {

  const { http } = useHttp()

  const login = (email: string, password: string): Promise<LoginResponse> => {

    return http.post('/auth/signin', { email, password })
  }

  const signUp = (payload: SignUpProps): Promise<LoginResponse> => {

    return http.post('/auth/signup', payload)
  }

  return {
    login,
    signUp
  }
}
