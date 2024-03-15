export interface IAuthStore {
  token: string | null | undefined
  setToken: (payload: string | null) => void
}