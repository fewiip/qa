import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IAuthStore } from './useAuthStore.types'

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null, //mexi aqui
      setUserData: (payload) => set({user: payload}),//mexi aqui
      isLoggedIn: () => Boolean(get().token?.length),
      setToken: (payload) => set({token: payload}),
      logout: () => set({ token: null })
    }),
    {
      name: 'AUTH_STORE',
      storage: createJSONStorage(() => localStorage)
    }
  )
  
)