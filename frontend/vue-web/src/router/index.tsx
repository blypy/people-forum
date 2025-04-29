import { lazy } from 'react'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import { createBrowserRouter } from 'react-router'
import { Suspense } from 'react'
import { NotFound } from '@/components/NotFound'
import Loading from '@/components/Loading'
import { RequireAuth } from '@/components/RequireAuth'

const Home = lazy(() => import('@/pages/layout/home'))
const PostList = lazy(() => import('@/pages/layout/user/postlist'))
const Layout = lazy(() => import('@/pages/layout/layout'))
const User = lazy(() => import('@/pages/layout/user'))
const Post = lazy(() => import('@/pages/layout/post'))
const Favorite = lazy(() => import('@/pages/layout/favorite'))
const Search = lazy(() => import('@/pages/layout/search'))

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
        element: (
          <RequireAuth>
            <Suspense fallback={<Loading />}>
              <Favorite />
            </Suspense>
          </RequireAuth>
        )
      },
      {
        path: '/search',
        element: (
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        )
      },
      {
        path: '/user/:id',
        element: (
          <RequireAuth>
            <Suspense fallback={<Loading />}>
              <User />
            </Suspense>
          </RequireAuth>
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
