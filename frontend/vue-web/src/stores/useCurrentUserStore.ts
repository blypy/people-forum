// 全局用户状态管理
import { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrentUserStore = {
  currentUser: User | null
  setUser: (user: User) => void
  clearUser: () => void
  isLoggedIn: boolean
}

export const useUserStore = create<CurrentUserStore>()(
  persist<CurrentUserStore>(
    set => ({
      currentUser: null,
      isLoggedIn: false,
      setUser: (currentUser: User) => set({ currentUser, isLoggedIn: true }),
      clearUser: () => set({ currentUser: null, isLoggedIn: false })
    }),
    {
      name: 'currentUser-storage'
    }
  )
)
