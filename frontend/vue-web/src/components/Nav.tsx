import DropMenu from './DropMenu'
import Posting from './Posting'
import { Button } from './ui/button'
import { ThemeToggle } from './ui/theme-toggle'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { NavLink, Link } from 'react-router'
import UserAvatar from './UserAvatar'
import { House, Search, Bookmark, CircleUserRound, MoreHorizontal } from 'lucide-react'
import { memo } from 'react'
import { User } from '@/types'

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
    link: `/user`
  }
]

const NavLinks = memo(function NavLinks({ currentUser }: { currentUser: User | null }) {
  return (
    <ul className="text-2xl flex flex-col gap-4">
      {nav.map(item => (
        <li key={item.link}>
          <NavLink
            to={item.link === '/user' ? `/user/${currentUser?.id}` : item.link}
            className={({ isActive }) =>
              `flex items-center gap-5 cursor-pointer hover:bg-secondary active:bg-secondary rounded-full py-2 px-4 transition-colors ${
                isActive ? 'font-bold' : ''
              }`
            }
          >
            {item.icon}
            <p className="hidden xl:block">{item.title}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  )
})

const UserMenu = memo(function UserMenu({ currentUser }: { currentUser: User | null }) {
  if (!currentUser) {
    return (
      <Link to="/login" className="w-full">
        <Button>登录</Button>
      </Link>
    )
  }

  return (
    <DropMenu>
      <div className="flex items-center gap-2 hover:bg-secondary active:bg-secondary/80 rounded-full py-2 px-4 transition-colors">
        <UserAvatar
          avatar={currentUser.avatar}
          name={currentUser.username}
          className="hover:scale-110 transition-transform"
        />
        <p className="xl:block hidden">{currentUser.username}</p>
        <MoreHorizontal className="xl:block hidden text-xl ml-5 self-end" />
      </div>
    </DropMenu>
  )
})

const Nav = () => {
  const currentUser = useUserStore(state => state.currentUser)
  return (
    <nav className="flex flex-col gap-4 xl:w-62 w-22 h-screen p-4 border-r fixed bg-background text-foreground">
      {/* logo */}
      <Link to={'/'}>
        <h1>
          <img src="/X.png" alt="logo" className="size-15 object-cover xl:-ml-2 -ml-1" />
        </h1>
      </Link>

      {/* 导航栏 */}
      <NavLinks currentUser={currentUser} />

      {/* 发布按钮 */}
      <div className="flex justify-center xl:block">
        <Posting mode={'post'}>
          <Button className="xl:w-full w-12 h-12 xl:h-auto rounded-full">
            <span className="hidden xl:inline">发布</span>
            <span className="xl:hidden text-2xl">+</span>
          </Button>
        </Posting>
      </div>

      {/* 个人信息 */}
      <div className="flex mt-auto items-center">
        <UserMenu currentUser={currentUser} />
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Nav
