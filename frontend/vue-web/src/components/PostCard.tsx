import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { formatDate } from '@/lib/utils'
import { Link } from 'react-router-dom'
import type { Posts } from '@/types'
import PostAction from './PostAction'
import PostImage from './PostImage'
import { useUserStore } from '@/stores/useCurrentUserStore'

const PostCard = ({ post }: { post: Posts }) => {
  const { currentUser } = useUserStore()
  const { user, content, createdAt, id } = post

  return (
    <div className="border-b border-r border-border p-4 hover:bg-secondary/40 transition-colors w-full">
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
          <Link to={`/post/${id}`}>
            <div className="flex items-center gap-1">
              <span className="font-bold">{user.username}</span>
              <span className="text-muted-foreground">{`@${user.handle}`}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{formatDate(createdAt)}</span>
            </div>

            {/* 帖子内容 */}
            <p className="mt-1 mb-3 break-all whitespace-pre-wrap">{content}</p>

            {/* 帖子图片 */}
            {post.images && <PostImage images={post.images} />}
          </Link>

          {/* 交互按钮 */}
          <PostAction
            comments={post.comments.length}
            likes={post.likes}
            favorites={post.favorites}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  )
}

export default PostCard
