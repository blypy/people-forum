import PostCard from '@/components/PostCard'
import { Posts } from '@/types'

const mockPost: Posts[] = [
  {
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

export default function Home() {
  return (
    <>
      <div>
        {mockPost?.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </>
  )
}
