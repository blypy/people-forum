// 登录注册
import type { User, AuthData } from '@/types'

interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
}

// 注册API
export async function register(data: AuthData): Promise<AuthResponse> {
  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '注册失败')
  }

  return await res.json()
}

// 登录API
export async function login(data: AuthData): Promise<AuthResponse> {
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '登录失败')
  }

  return await res.json()
}
