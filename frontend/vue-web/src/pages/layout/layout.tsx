import { Outlet, ScrollRestoration } from 'react-router'
import Nav from '@/components/Nav'

export default function Layout() {
  return (
    <div className="mx-auto w-full xl:w-7xl">
      <ScrollRestoration />
      <Nav></Nav>
      <div className="ml-22 xl:ml-62">
        <Outlet />
      </div>
    </div>
  )
}
