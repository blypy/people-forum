import { Navigate, useLocation } from 'react-router'

function useAuth() {
  const token = localStorage.getItem('token')
  return !!token
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth()
  const location = useLocation()

  if (!isAuth) {
    // 跳转到登录页，并保存当前想访问的路径
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
