import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageSquareMore as msg, ChevronDown, ChevronUp, Image as img } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router'
import { forwardRef, memo, useRef, useState, useImperativeHandle } from 'react'
import { Comments } from '@/types'
import { CommentImage, PostImage } from '@/components/PostImage'
import { formatDate } from '@/lib/utils'
import { usePostById } from '@/hooks/usePost'
import { ItemNotFound } from '@/components/NotFound'
import { useUserStore } from '@/stores/useCurrentUserStore'
import UserAvatar from '@/components/UserAvatar'
import PostAction from '@/components/PostAction'
import { useFile } from '@/hooks/useFile'
import { toast } from 'sonner'

const MessageSquareMore = memo(msg)
const Image = memo(img)

//评论组件
const Comment = ({ comment, avatar }: { comment: Comments; avatar: string }) => {
  const [showReplies, setShowReplies] = useState(false) //显示子评论状态
  const [showReplyInput, setShowReplyInput] = useState(false) //控制评论回复框显示状态
  const commentFormRef = useRef<{ focus: () => void }>(null) //评论表单ref

  const hasReplies = comment.replies && comment.replies.length > 0 //判断子评论是否存在

  return (
    <div className="p-4 border-b border-border">
      {/* 评论内容 */}
      <div className="flex gap-3">
        <Link to={`/user/${comment.user.id}`}>
          <UserAvatar avatar={comment.user.avatar} name={comment.user.avatar} className="size-10" />
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
                setTimeout(() => {
                  commentFormRef.current?.focus()
                }, 1)
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
            <CommentForm
              ref={commentFormRef}
              avatar={avatar}
              className="mt-3 pl-2 border-l-2 border-border"
              type="reply"
            />
          )}

          {/* 子评论列表 */}
          {hasReplies && showReplies && (
            <div className="mt-3 space-y-3 pl-2 border-l-2 border-border">
              {comment.replies?.map(reply => (
                <div key={reply.id} className="flex gap-2 pt-3">
                  <Link to={`/user/${reply.user.id}`}>
                    <UserAvatar avatar={reply.user.avatar} name={reply.user.avatar} className="siez-10" />
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
                        commentFormRef.current?.focus()
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

// 评论表单
const CommentForm = forwardRef<
  { focus: () => void },
  { avatar: string; className?: string; type: 'reply' | 'parent' }
>(({ avatar, className, type }, ref) => {
  const { imgRef, images, removeImage, handleImageChange, setImages } = useFile()
  const [commentContent, setCommentContent] = useState('')
  const commentRef = useRef<HTMLTextAreaElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      commentRef.current?.focus()
    }
  }))

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return
    if (commentContent.trim().length >= 200) {
      toast.error('评论最大200字')
      return
    }
    setCommentContent('')
    setImages([])

    if (type === 'parent') {
      //提交父评论
      console.log(commentContent + '父评论')
    } else {
      //提交子评论
      console.log(commentContent + '子评论')
    }

    toast.success('评论成功')
  }

  return (
    <form className={`flex items-start gap-3 ${className}`} onSubmit={handleSubmitComment}>
      <UserAvatar avatar={avatar} className="size-10" />
      <div className="flex-1">
        <textarea
          name="content"
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          placeholder="发布你的回复"
          className="w-full border-b border-border outline-none bg-transparent resize-none h-full"
          ref={commentRef}
        />
        <CommentImage images={images} onRemove={removeImage} />
        <div className="flex mt-2 justify-between">
          <input type="file" ref={imgRef} className="hidden" onChange={handleImageChange} name="images" />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-8"
            type="button"
            onClick={() => imgRef.current?.click()}
          >
            <Image className="size-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full text-xs" type="button">
              取消
            </Button>
            <Button
              className="rounded-full text-sm"
              size="sm"
              type="submit"
              disabled={!commentContent.trim()}
            >
              回复{commentContent && `(${commentContent.trim().length}字)`}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
})

const TopLink = () => {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
      <Button className="rounded-full mr-6" onClick={() => navigate(-1)} variant={'ghost'} size={'icon'}>
        <ArrowLeft className="size-5" />
      </Button>
      <h1 className="text-xl font-bold">帖子</h1>
    </div>
  )
}

export default function Post() {
  const { id } = useParams() //帖子的id
  const { data: post, isError } = usePostById(Number(id))
  const { currentUser } = useUserStore()

  if (isError || !post) return <ItemNotFound type="post" />

  return (
    <div className="mx-auto border-r border-border min-h-screen pb-20">
      {/* 顶部导航 */}
      <TopLink />

      <div className="p-4 pb-1 border-b border-border">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Link to={`/user/${post?.author.id}`}>
              <UserAvatar avatar={post.author.avatar} name={post.author.username} className="size-10" />
            </Link>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{post?.author.username}</span>
              </div>
              <p className="text-muted-foreground">{`@${post?.author.handle}`}</p>
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

        <PostAction
          comments={post?.comments.length || 0}
          likes={post?.likes}
          favorites={post?.favorites}
          currentUser={currentUser}
        />
      </div>

      {/* 回复输入框 */}
      <CommentForm avatar={currentUser?.avatar || ''} className="p-4 border-b border-border" type="parent" />
      {/* 回复列表 */}
      <div>
        {post?.comments.map(comment => (
          <Comment key={comment.id} comment={comment} avatar={currentUser?.avatar || ''} />
        ))}
      </div>
    </div>
  )
}
