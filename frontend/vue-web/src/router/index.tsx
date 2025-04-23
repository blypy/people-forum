import { lazy } from 'react'
import Layout from '@/pages/layout/layout'
import Login from '@/pages/auth/login'
import Post from '@/pages/post/post'
import Register from '@/pages/auth/register'
import User from '@/pages/user/user'
import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

import NotFound from '@/components/NotFound'
import Search from '@/pages/search/search'
import Loading from '@/components/Loading'
const Home = lazy(() => import('@/pages/layout/home'))
const PostList = lazy(() => import('@/components/PostList'))

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
        element: <Post />
      },
      {
        path: '/favorite',
        loader: () => {
          const posts = 'favorite'
          return posts
        },
        element: (
          <Suspense fallback={<Loading />}>
            <PostList />
          </Suspense>
        )
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/user/:id',
        element: <User />,
        children: [
          {
            path: '',
            loader: () => {
              const posts = 'post'
              return posts
            },
            element: (
              <Suspense fallback={<Loading />}>
                <PostList />
              </Suspense>
            )
          },
          {
            path: 'like',
            loader: () => {
              const posts = 'like'
              return posts
            },
            element: (
              <Suspense fallback={<Loading />}>
                <PostList />
              </Suspense>
            )
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
