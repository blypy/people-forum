import { formatDate } from '@/lib/utils'
import { Link } from 'react-router'
import type { Posts } from '@/types'
import PostAction from './PostAction'
import { PostImage } from './PostImage'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { memo } from 'react'
import UserAvatar from './UserAvatar'

const PostCard = ({ post }: { post: Posts }) => {
  const { currentUser } = useUserStore()
  const { author, content, createdAt, id } = post

  return (
    <div className="border-b border-r border-border p-4 hover:bg-secondary/40 transition-colors w-full">
      {/* 头像 */}
      <div className="flex gap-3">
        <Link to={`/user/${author.id}`} className="size-10">
          <UserAvatar avatar={author.avatar} name={author.username} className="size-10" />
        </Link>
        <div className="flex-1">
          {/* 用户信息及时间 */}
          <Link to={`/post/${id}`}>
            <div className="flex items-center gap-1">
              <span className="font-bold">{author.username}</span>
              <span className="text-muted-foreground">{`@${author.handle}`}</span>
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
            comments={post._count.comments}
            likes={post.likes}
            favorites={post.favorites}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(PostCard)
