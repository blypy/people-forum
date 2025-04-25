import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { User } from '@/types'
import { formatDate } from '@/lib/utils'
import { Outlet } from 'react-router'
import { Button } from '@/components/ui/button'
import { useUserById, useUserPosts } from '@/hooks/useUser'
import { ItemNotFound } from '@/components/NotFound'

export default function User() {
  const navigate = useNavigate()
  const { id } = useParams() //userid
  const [activeTab, setActiveTab] = useState('posts')
  const { data: user, isError } = useUserById(Number(id))
  const { data } = useUserPosts(Number(id))
  const posts = data?.posts

  // 用户不存在
  if (isError || !user) return <ItemNotFound type="user" />

  return (
    <div className="mx-auto border-r border-border min-h-screen">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{user?.username}</h1>
          <p className="text-sm text-muted-foreground">{posts?.length}条帖子</p>
        </div>
      </div>

      {/* 封面图 */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

      {/* 个人信息 */}
      <div className="p-4 border-b border-border relative">
        {/* 头像 */}
        <div className="absolute -top-16 left-4">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user?.avatar} alt={user?.username} />
            <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>

        {/* 用户名和简介 */}
        <div className="mt-15">
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-muted-foreground">{user?.handle}</p>

          <p className="my-3">{user?.bio}</p>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>加入于 {formatDate(user?.createdAt || new Date())}</span>
          </div>
        </div>
      </div>
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
      <Outlet />
    </div>
  )
}
