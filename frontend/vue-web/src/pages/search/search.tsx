import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import PostCard from '@/components/PostCard'
import type { Posts } from '@/types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const mockPost: Posts[] = [
  {
    id: 1, //帖子id
    content: '内容',
    images: ['/src/assets/react.svg'],
    createdAt: new Date(),
    user: {
      id: 1,
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
          id: 1,
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
              id: 2,
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
              id: 3,
              avatar: 'https://github.com/shadcn.png',
              username: '用户1',
              handle: '@123123'
            }
          }
        ]
      },
      {
        id: 1,
        content: '评论内容',
        createdAt: new Date(),
        user: {
          id: 4,
          avatar: 'https://github.com/shadcn.png',
          username: '用户1',
          handle: '@123123'
        }
      }
    ]
  },
  {
    id: 2, //帖子id
    content: '内容',
    images: ['/src/assets/react.svg', '/src/assets/react.svg'],
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
        id: 1,
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
    id: 3, //帖子id
    content: '内容',
    images: ['/src/assets/react.svg', '/src/assets/react.svg', '/src/assets/react.svg'],
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
        id: 1,
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
    id: 4, //帖子id
    content:
      '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
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
        id: 1,
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
]

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const navigate = useNavigate()
  const [input, setInput] = useState(query)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/search?q=${input}`)
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* 搜索栏 */}
      <form
        className="sticky top-0 p-4 border-r border-b z-10 bg-background flex justify-between items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-1 mr-2">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            placeholder="搜索"
            className="pl-10 h-12 rounded-full bg-muted border-none text-lg"
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </form>

      {query ? (
        <div>
          {mockPost?.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl pt-52 h-screen border-r">搜索内容</div>
      )}
    </div>
  )
}

export default Search
