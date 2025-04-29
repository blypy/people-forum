import { Comments } from '@/types'
import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { formatDate } from '@/lib/utils'
import { Button } from './ui/button'
import { ChevronUp, ChevronDown, MessageSquareMore } from 'lucide-react'
import UserAvatar from './UserAvatar'
import { PostImage } from './PostImage'
import CommentForm from './CommentForm'
const CommentList = ({ comment }: { comment: Comments }) => {
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
          <PostImage images={comment.images} />

          {/* 回复评论图标 */}
          <div className="flex items-center text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-auto hover:text-primary py-1 -ml-2"
              onClick={() => {
                setShowReplyInput(prev => !prev)
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
              className="mt-3 pl-2 border-l-2 border-border"
              type="reply"
              postId={comment.postId}
              commentId={comment.id}
              onClose={() => setShowReplyInput(false)}
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
                    <PostImage images={reply.images} />

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

export default CommentList
