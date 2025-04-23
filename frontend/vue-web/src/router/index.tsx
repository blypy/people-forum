import Home from '@/pages/layout/home'
import Layout from '@/pages/layout/layout'
import Login from '@/pages/auth/login'
import Post from '@/pages/post/post'
import Register from '@/pages/auth/register'
import User from '@/pages/user/user'
import { createBrowserRouter } from 'react-router-dom'

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
      },
      {
        path: '/user/:id',
        element: <User />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <div>not found</div>
  }
])

export default router
