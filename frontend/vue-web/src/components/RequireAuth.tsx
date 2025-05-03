import { Navigate, useLocation } from 'react-router'

function useAuth() {
  const token = localStorage.getItem('token')
  return !!token
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth()
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
