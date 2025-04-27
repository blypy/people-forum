import { ArrowLeft as arrow, Calendar as time } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router'
import { memo, useState } from 'react'
import type { User } from '@/types'
import { formatDate } from '@/lib/utils'
import { Outlet } from 'react-router'
import { Button } from '@/components/ui/button'
import { useUserById } from '@/hooks/useUser'
import { ItemNotFound } from '@/components/NotFound'
import UserAvatar from '@/components/UserAvatar'

const ArrowLeft = memo(arrow)
const Calendar = memo(time)

const TopLink = ({ name, postCount }: { name: string; postCount: number }) => {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
      <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'} size={'icon'}>
        <ArrowLeft className="size-5" />
      </Button>
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm text-muted-foreground">{postCount}条帖子</p>
      </div>
    </div>
  )
}

const UserProfile = memo(({ user }: { user: User }) => {
  return (
    <>
      {/* 顶部导航 */}
      <TopLink name={user.username} postCount={user._count.posts} />

      {/* 封面图 */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

      {/* 个人信息 */}
      <div className="p-4 border-b border-border relative">
        {/* 头像 */}
        <div className="absolute -top-16 left-4">
          <UserAvatar
            name={user.username}
            avatar={user.avatar}
            className="h-32 w-32 border-4 border-background"
          />
        </div>
        {/* 用户名和简介 */}
        <div className="mt-15">
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-muted-foreground">{user?.handle}</p>

          <p className="my-3">{user?.bio}</p>
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>加入于 {formatDate(user?.createdAt || new Date())}</span>
          </div>
        </div>
      </div>
    </>
  )
})

const ActiveTabBar = () => {
  const [activeTab, setActiveTab] = useState('posts')
  return (
    <div className="border-b border-border">
      <div className="flex">
        <Link
          to={''}
          className={`flex-1 py-3 px-4 font-medium text-center  ${
            activeTab === 'posts' ? 'border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          帖子
        </Link>
        <Link
          to={'like'}
          className={`flex-1 py-3 px-4 font-medium text-center ${
            activeTab === 'likes' ? 'border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('likes')}
        >
          喜欢
        </Link>
      </div>
    </div>
  )
}

export default function User() {
  const { id } = useParams() //userid
  const { data: user, isError } = useUserById(Number(id))
  // 用户不存在
  if (isError || !user) return <ItemNotFound type="user" />

  return (
    <div className="mx-auto border-r border-border min-h-screen">
      <UserProfile user={user} />
      <ActiveTabBar />
      <Outlet />
    </div>
  )
}
