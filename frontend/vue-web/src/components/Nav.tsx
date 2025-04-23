import logo from '/vite.svg'
import { NavLink, Link } from 'react-router-dom'
import { House, Search, Mail, Bookmark, CircleUserRound } from 'lucide-react'
import DropMenu from './DropMenu'
import Posting from './Posting'
import { ThemeToggle } from './ui/theme-toggle'

const nav = [
  {
    icon: <House />,
    title: '主页'
  },
  {
    icon: <Search />,
    title: '探索'
  },
  {
    icon: <Mail />,
    title: '通知'
  },
  {
    icon: <Mail />,
    title: '私信'
  },
  {
    icon: <Bookmark />,
    title: '书签'
  },
  {
    icon: <CircleUserRound />,
    title: '个人资料'
  }
]

const Nav = () => {
  return (
    <nav className="flex flex-col gap-4 xl:w-62 w-22 h-screen p-4 border-r fixed bg-background text-foreground">
      {/* logo */}
      <div className="flex items-center justify-between">
        <Link to={'/'} className="px-3">
          <h1>
            <img src={logo} alt="Vite logo" className="h-8 w-8" />
          </h1>
        </Link>
        {/* 主题切换 */}
        <ThemeToggle />
      </div>
      {/* 导航栏 */}
      <ul className="text-2xl flex flex-col gap-4">
        {nav.map((item, index) => (
          <li key={index}>
            <NavLink
              to={'/'}
              className="flex items-center gap-5 cursor-pointer hover:bg-secondary active:bg-secondary rounded-full py-2 px-4 transition-colors"
            >
              <div className="transition-transform">{item.icon}</div>
              <p className="hidden xl:block">{item.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* 发布按钮 */}
      <div className="flex justify-center xl:block">
        <Posting />
      </div>

      {/* 个人信息 */}
      <DropMenu />
    </nav>
  )
}
export default Nav
