// 登录注册
import type { User, LoginData, RegisterData } from '@/types'

interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
}

// 注册API
export async function fetchRegister(data: RegisterData): Promise<AuthResponse> {
  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message)
  }
  return await res.json()
}

// 登录API
export async function fetchLogin(data: LoginData): Promise<AuthResponse> {
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message)
  }

  return await res.json()
}

//退出登录
export async function fetchLogout(): Promise<{ success: boolean; message: string }> {
  const res = await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.messag)
  }

  const data = await res.json()

  return data
}
