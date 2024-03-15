import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IAuthStore } from './useAuthStore.types'

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (payload) => set({token: payload})
    }),
    {
      name: 'AUTH_STORE',
      storage: createJSONStorage(() => localStorage)
    }
  )
  
)