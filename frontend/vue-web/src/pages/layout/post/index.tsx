import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageSquareMore, ChevronDown, ChevronUp } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { Comments } from '@/types'
import PostImage from '@/components/PostImage'
import { formatDate } from '@/lib/utils'
import PostinteractionBar from '@/components/PostAction'
import { usePostById } from '@/hooks/usePost'
import { ItemNotFound } from '@/components/NotFound'
import { useUserStore } from '@/stores/useCurrentUserStore'

export default function Post() {
  const { id } = useParams() //帖子的id
  const navigate = useNavigate()
  const [commentContent, setCommentContent] = useState('')
  const { data: post, isError } = usePostById(Number(id))
  const { currentUser } = useUserStore()

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return
    setCommentContent('')
  }

  if (isError || !post) return <ItemNotFound type="post" />

  return (
    <div className="mx-auto border-r border-border min-h-screen pb-20">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'}>
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-xl font-bold">帖子</h1>
      </div>

      <div className="p-4 pb-1 border-b border-border">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Link to={`/user/${post?.user.id}`}>
              <Avatar className="size-10">
                <AvatarImage src={post?.user.avatar} alt={post?.user.avatar} />
                <AvatarFallback>{post?.user.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{post?.user.username}</span>
              </div>
              <p className="text-muted-foreground">{`@${post?.user.handle}`}</p>
            </div>
          </div>
        </div>

        {/* 帖子文本内容 */}
        <div className="mt-3 whitespace-pre-wrap">
          <p className="mb-1">{post?.content}</p>
        </div>

        <PostImage images={post?.images} />

        <div className="flex mt-4 text-muted-foreground text-sm border-b border-border pb-3">
          <span>{formatDate(post?.createdAt || new Date())}</span>
        </div>

        <PostinteractionBar
          comments={post?.comments.length || 0}
          likes={post?.likes}
          favorites={post?.favorites}
          currentUser={currentUser}
        />
      </div>

      {/* 回复输入框 */}
      <form className="p-4 border-b border-border flex items-start gap-3" onSubmit={handleSubmitComment}>
        <Avatar className="size-10">
          <AvatarImage src={currentUser?.avatar} alt="当前用户" />
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
        {post?.comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} avatar={currentUser?.avatar || ''} />
        ))}
      </div>
    </div>
  )
}

//评论组件
const CommentComponent = ({ comment, avatar }: { comment: Comments; avatar: string }) => {
  const [showReplies, setShowReplies] = useState(false) //显示子评论状态
  const [replyContent, setReplyContent] = useState('') //评论内容
  const [showReplyInput, setShowReplyInput] = useState(false) //控制评论回复框显示状态
  const replyInputRef = useRef<HTMLInputElement>(null) //评论input

  const hasReplies = comment.replies && comment.replies.length > 0 //判断子评论是否存在
  const isOnlyMention = (text: string) => {
    return /^@\w+：\s*$/.test(text.trim()) //检查评论内容
  }

  return (
    <div className="p-4 border-b border-border">
      {/* 评论内容 */}
      <div className="flex gap-3">
        <Link to={`/user/${comment.user.id}`}>
          <Avatar className="size-10">
            <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
            <AvatarFallback>{comment.user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold mr-1">{comment.user.username}</span>
            <span className="text-muted-foreground">{`@${comment.user.handle}`}</span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className="text-muted-foreground">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="mt-1 mb-2">{comment.content}</p>

          {/* 回复评论图标 */}
          <div className="flex items-center text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-auto hover:text-primary py-1 -ml-2"
              onClick={() => {
                setShowReplyInput(true)
                setReplyContent('')
                replyInputRef.current?.focus()
              }}
            >
              <MessageSquareMore className="size-4" />
              <span className="text-xs">回复</span>
            </Button>

            {/* 检查是否存在子评论 */}
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
                      <ChevronUp className="size-4 mr-1" />
                      隐藏回复
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-4 mr-1" />
                      查看{comment.replies?.length}条回复
                    </>
                  )}
                </span>
              </Button>
            )}
          </div>

          {/* 回复评论输入框 */}
          {showReplyInput && (
            <form className="mt-3 pl-2 border-l-2 border-border">
              <div className="flex items-start gap-2">
                <Avatar className="size-10">
                  <AvatarImage src={avatar} alt="当前用户" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder={`回复@${comment.user.handle}`}
                    ref={replyInputRef}
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
                      disabled={!replyContent.trim() || isOnlyMention(replyContent)}
                      onClick={() => {
                        // 添加提交回复的逻辑
                        console.log(`回复到评论 ${comment.id}: ${replyContent}`)
                        setShowReplyInput(false)
                        setReplyContent('')
                      }}
                    >
                      回复
                    </Button>
                  </div>
                </div>
              </div>
            </form>
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
                      <span className="text-muted-foreground text-xs">{`@${reply.user.handle}`}</span>
                      <span className="text-muted-foreground text-xs mx-1">·</span>
                      <span className="text-muted-foreground text-xs">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm">{reply.content}</p>

                    {/* 子评论的回复图标 */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-auto mt-1 hover:text-primary -ml-2 py-1"
                      onClick={() => {
                        setShowReplyInput(true)
                        setReplyContent(`@${reply.user.handle}：`)
                        replyInputRef.current?.focus()
                      }}
                    >
                      <MessageSquareMore className="size-3" />
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
