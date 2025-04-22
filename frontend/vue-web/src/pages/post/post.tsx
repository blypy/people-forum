import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageCircle, Heart, Share, Bookmark } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Posts } from '@/types'
import { formatDate } from '@/lib/utils'

// 模拟数据
const mockPost: Posts = {
  id: 1, //帖子id
  content: '内容',
  images: ['/src/assets/react.svg'],
  createdAt: new Date(),
  user: {
    avatar: 'https://github.com/shadcn.png',
    username: '用户1',
    handle: '@123123'
  },
  likes: [{ id: 1 }],
  favorites: [{ id: 1 }],
  comments: [
    {
      id: 1,
      content: '评论内容',
      createdAt: new Date(),
      user: {
        avatar: 'https://github.com/shadcn.png',
        username: '用户1',
        handle: '@123123'
      },
      replies: [
        {
          id: 1,
          parentId: 1,
          content: '评论内容',
          createdAt: new Date(),
          user: {
            avatar: 'https://github.com/shadcn.png',
            username: '用户1',
            handle: '@123123'
          }
        },
        {
          id: 2,
          parentId: 1,
          content: '评论内容',
          createdAt: new Date(),
          user: {
            avatar: 'https://github.com/shadcn.png',
            username: '用户1',
            handle: '@123123'
          }
        }
      ]
    },
    {
      id: 2,
      content: '评论内容',
      createdAt: new Date(),
      user: {
        avatar: 'https://github.com/shadcn.png',
        username: '用户1',
        handle: '@123123'
      }
    }
  ]
}

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState(mockPost)

  useEffect(() => {
    // 这里会有一个API调用来获取帖子数据
    setPost(mockPost) //模拟
  }, [id])

  return (
    <div className="w-2xl mx-auto border-x border-gray-200 min-h-screen pb-20">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-white/80 p-4 border-b border-gray-200 flex items-center">
        <Link to="/" className="mr-6">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">帖子</h1>
      </div>

      <div className="p-4 pb-1 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.avatar} alt={post.user.avatar} />
              <AvatarFallback>{post.user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{post.user.username}</span>
              </div>
              <p className="text-gray-500">{post.user.handle}</p>
            </div>
          </div>
        </div>

        {/* 帖子文本内容 */}
        <div className="mt-3 whitespace-pre-wrap">
          <p className="mb-1">{post.content}</p>
        </div>

        {post.images && post.images.length > 0 && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200">
            <img src={post.images[0]} alt="帖子图片" className="w-full object-cover" />
          </div>
        )}

        <div className="flex mt-4 text-gray-500 text-sm border-b border-gray-200 pb-3">
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <div className="flex justify-between mt-1">
          <Button variant="ghost" className="rounded-full">
            <MessageCircle className="size-5" />
          </Button>
          <Button variant="ghost" className={`rounded-full `}>
            <Heart className="size-5" />
          </Button>
          <Button variant="ghost" className={`rounded-full`}>
            <Bookmark className="size-5" />
          </Button>
          <Button variant="ghost" className="rounded-full">
            <Share className="size-5" />
          </Button>
        </div>
      </div>

      {/* 回复输入框 */}
      <form
        className="p-4 border-b border-gray-200 flex items-start gap-3"
        action={formData => {
          const content = formData.get('content')
          console.log(content)
        }}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="当前用户" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            name="content"
            placeholder="发布你的回复"
            className="w-full h-12 border-b border-gray-200 outline-none"
          />
          <div className="flex justify-end mt-2">
            <Button className="rounded-full bg-blue-500 hover:bg-blue-600" type="submit">
              回复
            </Button>
          </div>
        </div>
      </form>

      {/* 回复列表 */}
      <div>
        {post.comments.map(reply => (
          <div key={reply.id} className="p-4 border-b border-gray-200">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={reply.user.avatar} alt={reply.user.username} />
                <AvatarFallback>{reply.user.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-bold mr-1">{reply.user.username}</span>
                  <span className="text-gray-500">{reply.user.handle}</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-500">{formatDate(reply.createdAt)}</span>
                </div>
                <p className="mt-1">{reply.content}</p>

                {/* 回复按钮 */}
                <div className="flex justify-between mt-2 text-gray-500 max-w-xs">
                  <div>
                    <Button variant="ghost" size="sm" className="rounded-full p-0 h-auto">
                      <MessageCircle size={2} className="mr-1" />
                      <span className="text-xs">回复</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
