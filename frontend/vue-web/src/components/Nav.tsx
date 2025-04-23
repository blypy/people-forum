import { NavLink, Link } from 'react-router-dom'
import { House, Search, Bookmark, CircleUserRound } from 'lucide-react'
import DropMenu from './DropMenu'
import Posting from './Posting'
import { ThemeToggle } from './ui/theme-toggle'

const nav = [
  {
    icon: <House />,
    title: '主页',
    link: '/'
  },
  {
    icon: <Search />,
    title: '搜索',
    link: '/search'
  },
  {
    icon: <Bookmark />,
    title: '书签',
    link: '/favorite'
  },
  {
    icon: <CircleUserRound />,
    title: '个人资料',
    link: '/user/1'
  }
]

const Nav = () => {
  return (
    <nav className="flex flex-col gap-4 xl:w-62 w-22 h-screen p-4 border-r fixed bg-background text-foreground">
      {/* logo */}

      <Link to={'/'}>
        <h1>
          <img src="/X.png" alt="logo" className="size-15 object-cover xl:-ml-2 -ml-1" />
        </h1>
      </Link>

      {/* 导航栏 */}
      <ul className="text-2xl flex flex-col gap-4">
        {nav.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-5 cursor-pointer hover:bg-secondary active:bg-secondary rounded-full py-2 px-4 transition-colors ${
                  isActive && 'font-bold'
                }`
              }
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
      <div className="flex mt-auto items-center">
        <DropMenu />

        <ThemeToggle />
      </div>
    </nav>
  )
}
export default Nav
