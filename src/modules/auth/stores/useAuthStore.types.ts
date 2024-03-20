export interface UserData { 
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

export interface IAuthStore {
  token: string | null | undefined
  user: UserData | null | undefined, 
  setUserData: (payload: UserData | null) => void,
  isLoggedIn: () => boolean
  setToken: (payload: string | null) => void
  logout: () => void
}