import { useHttp } from "../../../config/useHttp.hook"

export interface UserData { //mexi aqui
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  bug: number,
  coin: number,
  refill: number,
  victory: number
}


interface LoginResponse {
  data: {
    token: string
    user: UserData,
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
