import { lazy } from 'react'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import Loading from '@/components/Loading'
import { NotFound } from '@/components/NotFound'
import { RequireAuth } from '@/components/RequireAuth'
import { QUERY_TAG } from '@/lib/query'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'

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
          <RequireAuth>
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
          </RequireAuth>
        )
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
            loader: () => QUERY_TAG.USER.POST,
            element: <PostList />
          },
          {
            path: 'like',
            loader: () => QUERY_TAG.USER.LIKE,
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
