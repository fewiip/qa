import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IAuthStore } from './useAuthStore.types'

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      isLoggedIn: () => Boolean(get().token?.length),
      setToken: (payload) => set({token: payload})
    }),
    {
      name: 'AUTH_STORE',
      storage: createJSONStorage(() => localStorage)
    }
  )
  
)