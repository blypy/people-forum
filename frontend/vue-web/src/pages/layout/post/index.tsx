import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useParams, useNavigate } from 'react-router'
import { PostImage } from '@/components/PostImage'
import { formatDate } from '@/lib/utils'
import { usePostById } from '@/hooks/usePost'
import { ItemNotFound } from '@/components/NotFound'
import UserAvatar from '@/components/UserAvatar'
import PostAction from '@/components/PostAction'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'

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
  const { id: postId } = useParams() //帖子的id
  const { data: post, isError, isLoading } = usePostById(Number(postId))

  if (isLoading) return
  if (isError || !post) return <ItemNotFound type="post" />

  return (
    <div className="mx-auto border-r border-border min-h-screen pb-20">
      {/* 顶部导航 */}
      <TopLink />

      <div className="p-4 pb-1 border-b border-border">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <UserAvatar
              avatar={post.author.avatar}
              name={post.author.username}
              userId={post?.author.id}
              className="size-10"
            />

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
          comments={post.comments.length || 0}
          likes={post.likes}
          favorites={post.favorites}
          postId={post.id}
        />
      </div>

      {/* 回复输入框 */}
      <CommentForm postId={Number(postId)} className="p-4 border-b border-border" type="parent" />
      {/* 回复列表 */}
      <div>
        {post?.comments.map(comment => (
          <CommentList key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
