import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Posts, Comments } from '@/types'
import PostImage from '@/components/PostImage'
import { formatDate } from '@/lib/utils'
import PostinteractionBar from '@/components/PostinteractionBar'

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
          content: '这是一条回复评论',
          createdAt: new Date(),
          user: {
            avatar: 'https://github.com/shadcn.png',
            username: '用户2',
            handle: '@user2'
          }
        },
        {
          id: 2,
          parentId: 1,
          content: '非常感谢您的评论！这是对您的评论的回复。',
          createdAt: new Date(),
          user: {
            avatar: 'https://github.com/shadcn.png',
            username: '用户3',
            handle: '@user3'
          }
        }
      ]
    },
    {
      id: 2,
      content: '这是另一条评论',
      createdAt: new Date(),
      user: {
        avatar: 'https://github.com/shadcn.png',
        username: '用户4',
        handle: '@user4'
      }
    }
  ]
}

const CommentComponent = ({ comment }: { comment: Comments }) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showReplyInput, setShowReplyInput] = useState(false)

  const hasReplies = comment.replies && comment.replies.length > 0

  return (
    <div className="p-4 border-b border-border">
      <div className="flex gap-3">
        <Link to={`/user/${comment.user.id}`}>
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
            <AvatarFallback>{comment.user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold mr-1">{comment.user.username}</span>
            <span className="text-muted-foreground">{comment.user.handle}</span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className="text-muted-foreground">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="mt-1 mb-2">{comment.content}</p>

          {/* 回复按钮 */}
          <div className="flex items-center mt-2 text-muted-foreground space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-0 h-auto hover:text-primary"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">回复</span>
            </Button>

            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => setShowReplies(!showReplies)}
              >
                <span className="text-xs flex items-center">
                  {showReplies ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      隐藏回复
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      查看{comment.replies?.length}条回复
                    </>
                  )}
                </span>
              </Button>
            )}
          </div>

          {/* 回复输入框 */}
          {showReplyInput && (
            <div className="mt-3 pl-2 border-l-2 border-border">
              <div className="flex items-start gap-2">
                <Avatar className="size-10 flex-shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" alt="当前用户" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder={`回复 @${comment.user.handle}`}
                    className="w-full border-b border-border py-2 bg-transparent outline-none text-sm"
                  />
                  <div className="flex justify-end mt-2 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => {
                        setShowReplyInput(false)
                        setReplyContent('')
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full text-xs"
                      disabled={!replyContent.trim()}
                      onClick={() => {
                        // 这里添加提交回复的逻辑
                        console.log(`回复到评论 ${comment.id}: ${replyContent}`)
                        setShowReplyInput(false)
                        setReplyContent('')
                        // 在实际项目中，这里应该发送请求添加回复
                      }}
                    >
                      回复
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 子评论列表 */}
          {hasReplies && showReplies && (
            <div className="mt-3 space-y-3 pl-2 border-l-2 border-border">
              {comment.replies?.map(reply => (
                <div key={reply.id} className="flex gap-2 pt-3">
                  <Link to={`/user/${reply.user.id}`}>
                    <Avatar className="size-10 flex-shrink-0">
                      <AvatarImage src={reply.user.avatar} alt={reply.user.username} />
                      <AvatarFallback>{reply.user.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap">
                      <span className="font-semibold text-sm mr-1">{reply.user.username}</span>
                      <span className="text-muted-foreground text-xs">{reply.user.handle}</span>
                      <span className="text-muted-foreground text-xs mx-1">·</span>
                      <span className="text-muted-foreground text-xs">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm">{reply.content}</p>

                    {/* 子评论的回复按钮 */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-0 h-auto mt-1 hover:text-primary"
                      onClick={() => {
                        setShowReplyInput(true)
                        setReplyContent(`@${reply.user.handle} `)
                      }}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span className="text-xs">回复</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState(mockPost)
  const [commentContent, setCommentContent] = useState('')

  useEffect(() => {
    setPost(mockPost) //模拟
  }, [id])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return

    console.log(`发表评论到帖子 ${id}: ${commentContent}`)

    setCommentContent('')
  }

  return (
    <div className="w-5xl mx-auto border-x border-border min-h-screen pb-20">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <Link to="/" className="mr-6">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">帖子</h1>
      </div>

      <div className="p-4 pb-1 border-b border-border">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Link to={`/user/${post.user.id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user.avatar} alt={post.user.avatar} />
                <AvatarFallback>{post.user.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{post.user.username}</span>
              </div>
              <p className="text-muted-foreground">{post.user.handle}</p>
            </div>
          </div>
        </div>

        {/* 帖子文本内容 */}
        <div className="mt-3 whitespace-pre-wrap">
          <p className="mb-1">{post.content}</p>
        </div>

        <PostImage images={post.images} />

        <div className="flex mt-4 text-muted-foreground text-sm border-b border-border pb-3">
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <PostinteractionBar post={post} />
      </div>

      {/* 回复输入框 */}
      <form className="p-4 border-b border-border flex items-start gap-3" onSubmit={handleSubmitComment}>
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="当前用户" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            name="content"
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
            placeholder="发布你的回复"
            className="w-full h-12 border-b border-border outline-none bg-transparent"
          />
          <div className="flex justify-end mt-2">
            <Button className="rounded-full" type="submit" disabled={!commentContent.trim()}>
              回复
            </Button>
          </div>
        </div>
      </form>

      {/* 回复列表 */}
      <div>
        {post.comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
