import { getToken } from '@/lib/token'
import { Navigate } from 'react-router'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
