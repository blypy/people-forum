import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Posts } from '@/types'

const PostCard = ({ post }: { post: Posts }) => {
  const { content, user, likes, favorites, createdAt, id, images, comments } = post

  return (
    <div className="w-2xl border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors border-r">
      {/* 头像 */}
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* 用户信息及时间 */}
          <div className="flex items-center gap-1">
            <span className="font-bold">{user.username}</span>
            <span className="text-gray-500">{user.handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formatDate(createdAt)}</span>
          </div>

          <Link to={`/post/${id}`}>
            {/* 帖子内容 */}
            <p className="mt-1 mb-3 break-all whitespace-pre-wrap">{content}</p>

            {/* 帖子图片 */}
            {images && (
              <div className="mb-3 rounded-2xl overflow-hidden">
                {images.length > 1 ? (
                  <div
                    className={cn(
                      'grid gap-1',
                      images.length === 2
                        ? 'grid-cols-2'
                        : images.length === 3
                        ? 'grid-cols-3'
                        : 'grid-cols-2'
                    )}
                  >
                    {images.map((img, index) => (
                      <div key={index} className="overflow-hidden border border-gray-200 min-h-[250px]">
                        <img src={img} alt={`图片 ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-h-[500px] border border-gray-200">
                    <img src={images[0]} alt="帖子图片" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}
          </Link>

          {/* 交互按钮 */}
          <div className="flex justify-between mt-2 text-gray-500">
            <Button className="flex items-center gap-2 hover:text-blue-500 transition-colors" variant="ghost">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments.length}</span>
            </Button>
            <Button className="flex items-center gap-2 hover:text-red-500 transition-colors" variant="ghost">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{likes.length}</span>
            </Button>
            <Button className="flex items-center gap-2 hover:text-blue-500 transition-colors" variant="ghost">
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">{favorites.length}</span>
            </Button>
            <Button className="flex items-center gap-2 hover:text-blue-500 transition-colors" variant="ghost">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
