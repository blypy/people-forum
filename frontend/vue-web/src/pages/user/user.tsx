import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { User, Posts } from '@/types'
import { formatDate } from '@/lib/utils'
import { Outlet } from 'react-router'

// 模拟用户数据
const mockUser: User & { bio: string } = {
  id: 1,
  avatar: 'https://github.com/shadcn.png',
  username: 'User',
  handle: '@User',
  createdAt: new Date('2020-01-01'),
  bio: '全栈开发者 | 热爱技术和创新 | 关注前沿科技动态'
}

// 模拟帖子数据
const mockPosts: Posts[] = [
  {
    id: 1,
    content: '今天学习了React的新特性，感觉收获颇丰！#React #前端开发',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    user: mockUser,
    comments: [],
    likes: [],
    favorites: []
  },
  {
    id: 2,
    content: '分享一个有趣的项目：使用Vue.js构建的社交媒体平台，欢迎大家来看看！',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    images: ['/src/assets/react.svg'],
    user: mockUser,
    comments: [
      {
        id: 1,
        content: '非常棒的项目！',
        createdAt: new Date(),
        user: { ...mockUser, username: '用户1', handle: '@user1' }
      }
    ],
    likes: [{ id: 1 }],
    favorites: []
  },
  {
    id: 3,
    content: '刚完成了一个使用TypeScript的项目，类型系统真的能让代码更加健壮！',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    user: mockUser,
    comments: [],
    likes: [{ id: 1 }, { id: 2 }],
    favorites: [{ id: 1 }]
  }
]

export default function User() {
  const { id } = useParams() //userid
  const [user, setUser] = useState(mockUser)
  const [posts, setPosts] = useState<Posts[]>(mockPosts)
  const [activeTab, setActiveTab] = useState('posts')

  useEffect(() => {
    setUser(mockUser)
    setPosts(mockPosts)
  }, [id])

  return (
    <div className="mx-auto border-r border-border min-h-screen">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <Link to="/" className="mr-6">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{user.username}</h1>
          <p className="text-sm text-muted-foreground">{posts.length}条帖子</p>
        </div>
      </div>

      {/* 封面图 */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

      {/* 个人信息 */}
      <div className="p-4 border-b border-border relative">
        {/* 头像 */}
        <div className="absolute -top-16 left-4">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>

        {/* 用户名和简介 */}
        <div className="mt-15">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-muted-foreground">{user.handle}</p>

          <p className="my-3">{user.bio}</p>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>加入于 {formatDate(user.createdAt!)}</span>
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
