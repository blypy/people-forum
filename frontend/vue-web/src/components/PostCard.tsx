import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { formatDate } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Posts } from '@/types'
import PostAction from './PostinteractionBar'
import PostImage from './PostImage'

const PostCard = ({ post }: { post: Posts }) => {
  const { user, content, createdAt, id } = post

  return (
    <div className="w-5xl border-b border-border p-4 hover:bg-secondary/40 transition-colors">
      {/* 头像 */}
      <div className="flex gap-3">
        <Avatar className="size-10">
          <Link to={`/user/${user.id}`} className="size-10">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Link>
        </Avatar>
        <div className="flex-1">
          {/* 用户信息及时间 */}
          <div className="flex items-center gap-1">
            <span className="font-bold">{user.username}</span>
            <span className="text-muted-foreground">{user.handle}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{formatDate(createdAt)}</span>
          </div>

          <Link to={`/post/${id}`}>
            {/* 帖子内容 */}
            <p className="mt-1 mb-3 break-all whitespace-pre-wrap">{content}</p>

            {/* 帖子图片 */}
            {post.images && <PostImage images={post.images} />}
          </Link>

          {/* 交互按钮 */}
          <PostAction post={post} />
        </div>
      </div>
    </div>
  )
}

export default PostCard
