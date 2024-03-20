export interface UserData { //mexi aqui
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  score: number,
}

export interface IAuthStore {
  token: string | null | undefined
  user: UserData | null | undefined, //mexi aqui
  setUserData: (payload: UserData | null) => void, //mexi aqui
  isLoggedIn: () => boolean
  setToken: (payload: string | null) => void
  logout: () => void
}