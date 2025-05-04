import { httpClient } from '@/lib/http'
import type { User, LoginData, RegisterData } from '@/types'

interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
}

// 登录注册
// 注册API
export async function fetchRegister(registerData: RegisterData) {
  const data = await httpClient.post<AuthResponse, RegisterData>('/auth/register', {
    ...registerData
  })

  return data
}

// 登录API
export async function fetchLogin(loginData: LoginData) {
  const data = await httpClient.post<AuthResponse, LoginData>('/auth/login', {
    ...loginData
  })
  return data
}

//退出登录
export async function fetchLogout() {
  const data = await httpClient.post<{ success: boolean; message: string }>('/auth/logout')
  return data
}
