import { Outlet } from 'react-router-dom'
import Nav from '@/components/Nav'

export default function Layout() {
  return (
    <div className="w-7xl mx-auto">
      <div className="flex">
        <Nav></Nav>
        <div className="xl:ml-62 ml-22">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
