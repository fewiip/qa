export interface IAuthStore {
  token: string | null | undefined
  isLoggedIn: () => boolean
  setToken: (payload: string | null) => void
}