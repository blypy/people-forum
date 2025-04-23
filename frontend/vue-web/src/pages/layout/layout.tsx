import { Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from '@/components/Nav'

export default function Layout() {
  return (
    <div className="xl:w-7xl mx-auto w-full">
      <ScrollRestoration />
      <div>
        <Nav></Nav>
        <div className="xl:ml-62 ml-22">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
