import { memo } from 'react'
import { NavLink, Link } from 'react-router'
import { House, Search, Bookmark, CircleUserRound, MoreHorizontal } from 'lucide-react'
import DropMenu from './DropMenu'
import Posting from './Posting'
import UserAvatar from './UserAvatar'
import { Button } from './ui/button'
import { ThemeToggle } from './ui/theme-toggle'
import { useUserStore } from '@/stores/useCurrentUserStore'
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
    <ul className="flex flex-col gap-4 text-2xl">
      {nav.map(item => (
        <li key={item.link}>
          <NavLink
            to={item.link === '/user' ? `/user/${currentUser?.id}` : item.link}
            className={({ isActive }) =>
              `hover:bg-secondary active:bg-secondary flex cursor-pointer items-center gap-5 rounded-full px-4 py-2 transition-colors ${
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
      <div className="hover:bg-secondary active:bg-secondary/80 flex items-center gap-2 rounded-full px-4 py-2 transition-colors">
        <UserAvatar avatar={currentUser.avatar} name={currentUser.username} />
        <p className="hidden xl:block">{currentUser.username}</p>
        <MoreHorizontal className="ml-5 hidden self-end text-xl xl:block" />
      </div>
    </DropMenu>
  )
})

const Nav = () => {
  const currentUser = useUserStore(state => state.currentUser)
  return (
    <nav className="bg-background text-foreground fixed flex h-screen w-22 flex-col gap-4 border-r p-4 xl:w-62">
      {/* logo */}
      <Link to={'/'}>
        <h1>
          <img src="/X.png" alt="logo" className="-ml-1 size-15 object-cover xl:-ml-2" />
        </h1>
      </Link>

      {/* 导航栏 */}
      <NavLinks currentUser={currentUser} />

      {/* 发布按钮 */}
      <div className="flex justify-center xl:block">
        <Posting mode={'post'}>
          <Button className="h-12 w-12 rounded-full xl:h-auto xl:w-full">
            <span className="hidden xl:inline">发布</span>
            <span className="text-2xl xl:hidden">+</span>
          </Button>
        </Posting>
      </div>

      {/* 个人信息 */}
      <div className="mt-auto flex items-center">
        <UserMenu currentUser={currentUser} />
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Nav
