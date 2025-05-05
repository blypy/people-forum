import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { ChevronUp, ChevronDown, MessageSquareMore } from 'lucide-react'
import CommentForm from './CommentForm'
import { PostImage } from './PostImage'
import UserAvatar from './UserAvatar'
import { Button } from './ui/button'
import { formatDate } from '@/lib/utils'
import { Comments } from '@/types'
import { useUserStore } from '@/stores/useCurrentUserStore'

const CommentList = ({ comment }: { comment: Comments }) => {
  const currentUser = useUserStore(state => state.currentUser)
  const [showReplies, setShowReplies] = useState(false) //显示子评论状态
  const [showReplyInput, setShowReplyInput] = useState(false) //控制评论回复框显示状态
  const commentFormRef = useRef<{ focus: () => void }>(null) //评论表单ref
  const hasReplies = comment.replies && comment.replies.length > 0 //判断子评论是否存在

  return (
    <div className="border-border border-b p-4">
      {/* 评论内容 */}
      <div className="flex gap-3">
        <Link to={`/user/${comment.user.id}`}>
          <UserAvatar
            avatar={comment.user.avatar}
            name={comment.user.username}
            className="size-10"
            userId={comment.user.id}
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="mr-1 font-bold">{comment.user.username}</span>
            <span className="text-muted-foreground">{comment.user.handle}</span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className="text-muted-foreground">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="mt-1 mb-2">{comment.content}</p>
          <PostImage images={comment.images} />

          {/* 回复评论图标 */}
          <div className="text-muted-foreground flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary -ml-2 h-auto rounded-full py-1"
              onClick={() => {
                setShowReplyInput(prev => !prev)
                setTimeout(() => {
                  commentFormRef.current?.focus()
                }, 1)
              }}
            >
              {currentUser && (
                <>
                  <MessageSquareMore className="size-4" />
                  <span className="text-xs">回复</span>
                </>
              )}
            </Button>

            {/* 检查是否存在子评论 */}
            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary h-auto rounded-full p-0"
                onClick={() => setShowReplies(!showReplies)}
              >
                <span className={`flex items-center text-xs ${!currentUser && '-ml-3.5'}`}>
                  {showReplies ? (
                    <>
                      <ChevronUp className="mr-1 size-4" />
                      隐藏回复
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-1 size-4" />
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
              className="border-border mt-3 border-l-2 pl-2"
              type="reply"
              postId={comment.postId}
              commentId={comment.id}
              onClose={() => setShowReplyInput(false)}
            />
          )}

          {/* 子评论列表 */}
          {hasReplies && showReplies && (
            <div className="border-border mt-3 space-y-3 border-l-2 pl-2">
              {comment.replies?.map(reply => (
                <div key={reply.id} className="flex gap-2 pt-3">
                  <Link to={`/user/${reply.user.id}`}>
                    <UserAvatar avatar={reply.user.avatar} name={reply.user.username} className="siez-10" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center">
                      <span className="mr-1 text-sm font-semibold">{reply.user.username}</span>
                      <span className="text-xs">{reply.user.handle}</span>
                      <span className="mx-1 text-xs">·</span>
                      <span className="text-xs">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm">{reply.content}</p>
                    <PostImage images={reply.images} />

                    {/* 子评论的回复图标 */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-primary mt-1 -ml-2 h-auto rounded-full py-1"
                      onClick={() => {
                        setShowReplyInput(true)
                        commentFormRef.current?.focus()
                      }}
                    >
                      {currentUser && (
                        <>
                          <MessageSquareMore className="size-3" />
                          <span className="text-xs">回复</span>
                        </>
                      )}
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
