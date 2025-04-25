import { lazy } from 'react'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

import { NotFound } from '@/components/NotFound'
import Search from '@/pages/layout/search'
import Loading from '@/components/Loading'

const Home = lazy(() => import('@/pages/layout/home'))
const PostList = lazy(() => import('@/components/PostList'))
const Layout = lazy(() => import('@/pages/layout/layout'))
const User = lazy(() => import('@/pages/layout/user'))
const Post = lazy(() => import('@/pages/layout/post'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: '/post/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <Post />
          </Suspense>
        )
      },
      {
        path: '/favorite',
        loader: () => {
          return 'USER-FAVORITE'
        },
        element: <PostList />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/user/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
        children: [
          {
            path: '',
            loader: () => {
              return 'USER-POSTS'
            },
            element: <PostList />
          },
          {
            path: 'like',
            loader: () => {
              return 'USER-LIKES'
            },
            element: <PostList />
          }
        ]
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
    element: <NotFound />
  }
])

export default router
