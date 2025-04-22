import Home from '@/pages/layout/home'
import Layout from '@/pages/layout/layout'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/auth/login'
import Post from '@/pages/post/post'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/post/:id',
        element: <Post />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
