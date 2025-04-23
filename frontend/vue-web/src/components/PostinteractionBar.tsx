import type { Posts, User } from '@/types'
import { Button } from './ui/button'
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface PostActionProps {
  post: Posts
  currentUser?: User | null // 当前登录用户
}

const PostAction = ({ post, currentUser }: PostActionProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes.length)
  const [favoritesCount, setFavoritesCount] = useState(post.favorites.length)

  // 点赞逻辑
  const handleLike = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }

    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    //更新本地喜欢
    setLikesCount(prev => (newLikedState ? prev + 1 : prev - 1))
  }

  // 收藏逻辑
  const handleFavorite = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }

    const newFavoritedState = !isFavorited
    setIsFavorited(newFavoritedState)

    // 更新本地收藏
    setFavoritesCount(prev => (newFavoritedState ? prev + 1 : prev - 1))
  }

  return (
    <div className="flex justify-between mt-2 text-gray-500">
      <Button className="flex items-center gap-2 hover:text-blue-500 rounded-full" variant="ghost">
        <MessageSquare className="size-5" />
        <span className="text-sm">{post.comments.length}</span>
      </Button>
      <Button
        className={cn('flex items-center gap-2 hover:text-red-500 rounded-full', isLiked && 'text-red-500')}
        variant="ghost"
        onClick={handleLike}
      >
        <Heart className="size-5" fill={isLiked ? 'currentColor' : 'none'} />
        <span className="text-sm">{likesCount}</span>
      </Button>
      <Button
        className={cn(
          'flex items-center gap-2 hover:text-blue-500 rounded-full',
          isFavorited && 'text-blue-500'
        )}
        variant="ghost"
        onClick={handleFavorite}
      >
        <Bookmark className="size-5" fill={isFavorited ? 'currentColor' : 'none'} />
        <span className="text-sm">{favoritesCount}</span>
      </Button>
      <Button className="flex items-center gap-2 hover:text-blue-500 rounded-full" variant="ghost">
        <Share className="size-5" />
      </Button>
    </div>
  )
}

export default PostAction
