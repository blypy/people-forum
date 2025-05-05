// 全局用户状态管理
import { getCurrentUser } from '@/api'
import { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrentUserStore = {
  currentUser: User | null
  setUser: () => void
  clearUser: () => void
  isLoggedIn: boolean
}

export const useUserStore = create<CurrentUserStore>()(
  persist<CurrentUserStore>(
    set => ({
      currentUser: null,
      isLoggedIn: false,
      setUser: async () => {
        const res = await getCurrentUser()
        set({ currentUser: res.user, isLoggedIn: true })
      },

      clearUser: () => {
        set({ currentUser: null, isLoggedIn: false })
        localStorage.removeItem('currentUser-storage')
      }
    }),
    {
      name: 'currentUser-storage'
    }
  )
)
