import Posting from './Posting'
import { toast } from 'sonner'
import { cn, formatNumber } from '@/lib/utils'
import { useState, useRef } from 'react'
import { Button } from './ui/button'
import type { Favorites, Like } from '@/types'
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react'
import { useMarkPost, useUnMarkPost } from '@/hooks/useUser'
import { useUserStore } from '@/stores/useCurrentUserStore'

interface PostActionProps {
  postId: number
  comments: number
  likes: Like[]
  favorites: Favorites[]
}

const PostAction = ({ postId, comments, likes, favorites }: PostActionProps) => {
  const currentUser = useUserStore(state => state.currentUser)
  const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === currentUser?.id)) //喜欢状态
  const [isFavorited, setIsFavorited] = useState(
    favorites.some(favorite => favorite.userId === currentUser?.id)
  ) //收藏状态
  const [likesCount, setLikesCount] = useState(likes.length) //喜欢数量
  const [favoritesCount, setFavoritesCount] = useState(favorites.length) //收藏数量
  const markPost = useMarkPost()
  const unMarkPost = useUnMarkPost()
  
  // 添加throttle状态控制
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isThrottlingRef = useRef<boolean>(false)
  
  // 节流函数
  const throttle = (callback: () => void, delay: number = 1000) => {
    if (isThrottlingRef.current) return
    
    isThrottlingRef.current = true
    callback()
    
    throttleTimerRef.current = setTimeout(() => {
      isThrottlingRef.current = false
    }, delay)
  }

  // 点赞逻辑
  const handleLike = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }
    
    // 使用节流控制
    throttle(() => {
      if (!isLiked) {
        markPost.mutate({ userId: currentUser.id, postId: postId, type: 'like' })
      } else {
        unMarkPost.mutate({ userId: currentUser.id, postId: postId, type: 'like' })
      }

      //更新本地喜欢
      const newLikedState = !isLiked
      setIsLiked(newLikedState)
      setLikesCount(prev => (newLikedState ? prev + 1 : prev - 1))
    })
  }

  // 收藏逻辑
  const handleFavorite = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }
    
    // 使用节流控制
    throttle(() => {
      if (!isFavorited) {
        markPost.mutate({ userId: currentUser.id, postId: postId, type: 'favorite' })
      } else {
        unMarkPost.mutate({ userId: currentUser.id, postId: postId, type: 'favorite' })
      }

      // 更新本地收藏
      const newFavoritedState = !isFavorited
      setIsFavorited(newFavoritedState)
      setFavoritesCount(prev => (newFavoritedState ? prev + 1 : prev - 1))
    })
  }

  return (
    <div className="flex justify-between mt-1">
      <Posting mode="comment" postId={postId}>
        <Button className="flex items-center gap-2 hover:text-blue-500 rounded-full" variant={'ghost'}>
          <MessageSquare className="size-5" />
          <span className="text-sm">{comments > 0 ? formatNumber(comments) : 0}</span>
        </Button>
      </Posting>
      <Button
        className={cn('flex items-center gap-2 hover:text-red-500 rounded-full', isLiked && 'text-red-500')}
        variant={'ghost'}
        onClick={handleLike}
        disabled={isThrottlingRef.current && markPost.isPending}
      >
        <Heart className="size-5" fill={isLiked ? 'currentColor' : 'none'} />
        <span className="text-sm">{likesCount > 0 ? formatNumber(likesCount) : 0}</span>
      </Button>
      <Button
        className={cn(
          'flex items-center gap-2 hover:text-blue-500 rounded-full',
          isFavorited && 'text-blue-500'
        )}
        variant={'ghost'}
        onClick={handleFavorite}
        disabled={isThrottlingRef.current && markPost.isPending}
      >
        <Bookmark className="size-5" fill={isFavorited ? 'currentColor' : 'none'} />
        <span className="text-sm">{favoritesCount > 0 ? formatNumber(favoritesCount) : 0}</span>
      </Button>
      <Button
        className="flex items-center gap-2 hover:text-green-500 rounded-full"
        variant={'ghost'}
        size={'icon'}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          toast.success('链接已复制到剪贴板')
        }}
      >
        <Share className="size-5" />
      </Button>
    </div>
  )
}

export default PostAction
