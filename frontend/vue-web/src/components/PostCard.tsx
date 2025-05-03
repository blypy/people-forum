import { memo } from 'react'
import { Link } from 'react-router'
import PostAction from './PostAction'
import { PostImage } from './PostImage'
import UserAvatar from './UserAvatar'
import { formatDate } from '@/lib/utils'
import type { Posts } from '@/types'

const PostCard = ({ post }: { post: Posts }) => {
  const { author, content, createdAt, id } = post

  return (
    <div className="border-border hover:bg-secondary/40 w-full border-r border-b p-5">
      {/* 头像 */}
      <Link to={`/post/${id}`}>
        <div className="flex gap-2">
          <UserAvatar avatar={author.avatar} name={author.username} className="size-10" userId={author.id} />
          <div className="flex-col">
            {/* 用户信息及时间 */}
            <div className="flex items-center gap-1">
              <span className="font-bold">{author.username}</span>
              <span>{`@${author.handle}`}</span>
              <span>·</span>
              <span>{formatDate(createdAt)}</span>
            </div>
            {/* 帖子内容 */}
            <p className="mb-3 break-all whitespace-pre-wrap">{content}</p>
          </div>
        </div>
        <PostImage images={post.images} />
        {/* 交互按钮 */}
      </Link>
      <PostAction comments={post._count.comments} likes={post.likes} favorites={post.favorites} postId={post.id} />
    </div>
  )
}

export default memo(PostCard)
