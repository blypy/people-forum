import { useLoaderData } from 'react-router-dom'
import PostCard from './PostCard'
import type { User, Posts } from '@/types'
import { useEffect } from 'react'

const mockUser: User & { bio: string } = {
  id: 1,
  avatar: 'https://github.com/shadcn.png',
  username: 'User',
  handle: '@User',
  createdAt: new Date('2020-01-01'),
  bio: '全栈开发者 | 热爱技术和创新 | 关注前沿科技动态'
}
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

const PostList = () => {
  const post = useLoaderData()
  useEffect(() => {
    if (post === 'like') {
      //查询喜欢的帖子
    } else if (post === 'post') {
      //查询用户发布的帖子
    }
  }, [post])

  return (
    <div>
      {mockPosts?.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
