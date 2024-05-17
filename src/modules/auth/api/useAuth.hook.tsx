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

export interface ChangeReponse {
  data: UserData
}

export interface RoleResponse {
  data: {
    isAdmin: boolean
  }
}
 
export const useAuth = () => {

  const { http } = useHttp()

  const login = (email: string, password: string): Promise<LoginResponse> => {
    return http.post('/auth/signin', { email, password })
  }

  const signUp = (payload: SignUpProps): Promise<LoginResponse> => {
    return http.post('/auth/signup', payload)
  }

  const changePassword = (payload: SignUpProps, userid: number) : Promise<ChangeReponse> => {
    return http.put(`user/${userid}/password`, payload)
  }

  const changeEmail = (payload: SignUpProps, userid: number) : Promise<ChangeReponse> => {
    return http.put(`user/${userid}/email`, payload)
  }

  const changeName = (payload: SignUpProps, userid: number) : Promise<ChangeReponse> => {
    return http.put(`user/${userid}/name`, payload)
  }

  const transforToUser = (userid: number) : Promise<ChangeReponse> => {
    return http.put(`user/${userid}/promote/user`)
  }
  const transforToAdmin  = (userid: number) : Promise<RoleResponse> => {
    return http.put(`user/${userid}/promote/admin`)
  }

  const getRole = (userid: number) : Promise<RoleResponse> => {
    return http.get(`/user/${userid}/admin`)
  }
  

  return {
    login,
    signUp, 
    changePassword, 
    changeEmail,
    changeName,
    transforToUser,
    transforToAdmin,
    getRole,
  }
}
