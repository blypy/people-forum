import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
import { ItemNotFound } from '@/components/NotFound'
import PostAction from '@/components/PostAction'
import { PostImage } from '@/components/PostImage'
import UserAvatar from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { usePostById } from '@/hooks/usePost'
import { formatDate } from '@/lib/utils'
import Loading from '@/components/Loading'

const TopLink = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-background border-border sticky top-0 z-10 flex items-center border-b p-4">
      <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'} size={'icon'}>
        <ArrowLeft className="size-5" />
      </Button>
      <h1 className="text-xl font-bold">帖子</h1>
    </div>
  )
}

export default function Post() {
  const { id: postId } = useParams() //帖子的id
  const { data: post, isError, isLoading } = usePostById(Number(postId))

  if (isLoading) return <Loading />
  if (isError || !post) return <ItemNotFound type="post" />

  return (
    <div className="border-border mx-auto min-h-screen border-r pb-20">
      {/* 顶部导航 */}
      <TopLink />

      <div className="border-border border-b p-4 pb-1">
        <div className="flex items-start justify-between">
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
              <p className="text-muted-foreground">{post?.author.handle}</p>
            </div>
          </div>
        </div>

        {/* 帖子文本内容 */}
        <div className="mt-3 whitespace-pre-wrap">
          <p className="mb-1">{post?.content}</p>
        </div>
        <PostImage images={post?.images} />
        <div className="text-muted-foreground border-border mt-4 flex border-b pb-3 text-sm">
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
      <CommentForm postId={Number(postId)} className="border-border border-b p-4" type="parent" />
      {/* 回复列表 */}
      <div>{post?.comments.map(comment => <CommentList key={comment.id} comment={comment} />)}</div>
    </div>
  )
}
