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
    <div className="border-b border-r py-5 border-border hover:bg-secondary/40 transition-colors w-full">
      {/* 头像 */}
      <Link to={`/post/${id}`}>
        <div className="mx-5">
          <div className="flex gap-2">
            <UserAvatar
              avatar={author.avatar}
              name={author.username}
              className="size-10"
              userId={author.id}
            />
            <div className="flex-col">
              {/* 用户信息及时间 */}
              <div className="flex items-center gap-1">
                <span className="font-bold">{author.username}</span>
                <span className="text-muted-foreground">{`@${author.handle}`}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{formatDate(createdAt)}</span>
              </div>
              {/* 帖子内容 */}
              <p className="mb-3 break-all whitespace-pre-wrap">{content}</p>
            </div>
          </div>
          <PostImage images={post.images} />
          {/* 交互按钮 */}
          <PostAction
            comments={post._count.comments}
            likes={post.likes}
            favorites={post.favorites}
            currentUser={currentUser}
            postId={post.id}
          />
        </div>
      </Link>
    </div>
  )
}

export default memo(PostCard)
