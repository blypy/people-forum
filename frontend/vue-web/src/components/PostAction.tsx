import { useState } from 'react'
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import Posting from './Posting'
import { Button } from './ui/button'
import { useThrottle } from '@/hooks/useThrottle'
import { useMarkPost, useUnMarkPost } from '@/hooks/useUser'
import { cn, formatNumber } from '@/lib/utils'
import { useUserStore } from '@/stores/useCurrentUserStore'
import type { Favorites, Like } from '@/types'

interface PostActionProps {
  postId: number
  comments: number
  likes: Like[]
  favorites: Favorites[]
}

const PostAction = ({ postId, comments, likes, favorites }: PostActionProps) => {
  const currentUser = useUserStore(state => state.currentUser)
  const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === currentUser?.id)) //喜欢状态
  const [isFavorited, setIsFavorited] = useState(favorites.some(favorite => favorite.userId === currentUser?.id)) //收藏状态
  const [likesCount, setLikesCount] = useState(likes.length) //喜欢数量
  const [favoritesCount, setFavoritesCount] = useState(favorites.length) //收藏数量
  const markPostMutation = useMarkPost()
  const unMarkPostMutation = useUnMarkPost()
  const { throttle, isThrottlingRef } = useThrottle()

  // 点赞逻辑
  const handleLike = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }

    throttle(async () => {
      try {
        if (!isLiked) {
          await markPostMutation.mutateAsync({ userId: currentUser.id, postId: postId, type: 'like' })
          console.log(markPostMutation.error)

          if (markPostMutation.error) {
            toast.error(markPostMutation.error.message)
          }
        } else {
          await unMarkPostMutation.mutateAsync({ userId: currentUser.id, postId: postId, type: 'like' })
        }

        //更新本地喜欢
        const newLikedState = !isLiked
        setIsLiked(newLikedState)
        setLikesCount(prev => (newLikedState ? prev + 1 : prev - 1))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        toast.error(`点赞失败：${errorMessage}`)
      }
    })
  }

  // 收藏逻辑
  const handleFavorite = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }

    throttle(async () => {
      try {
        if (!isFavorited) {
          await markPostMutation.mutateAsync({ userId: currentUser.id, postId: postId, type: 'favorite' })
        } else {
          await unMarkPostMutation.mutateAsync({ userId: currentUser.id, postId: postId, type: 'favorite' })
        }

        // 更新本地收藏
        const newFavoritedState = !isFavorited
        setIsFavorited(newFavoritedState)
        setFavoritesCount(prev => (newFavoritedState ? prev + 1 : prev - 1))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        toast.error(`收藏失败：${errorMessage}`)
      }
    })
  }

  return (
    <div className="mt-1 flex justify-between">
      <Posting mode="comment" postId={postId}>
        <Button className="flex items-center gap-2 rounded-full hover:text-blue-500" variant={'ghost'}>
          <MessageSquare className="size-5" />
          <span className="text-sm">{comments > 0 ? formatNumber(comments) : 0}</span>
        </Button>
      </Posting>
      <Button
        className={cn('flex items-center gap-2 rounded-full hover:text-red-500', isLiked && 'text-red-500')}
        variant={'ghost'}
        onClick={handleLike}
        disabled={isThrottlingRef.current && markPostMutation.isPending}
      >
        <Heart className="size-5" fill={isLiked ? 'currentColor' : 'none'} />
        <span className="text-sm">{likesCount > 0 ? formatNumber(likesCount) : 0}</span>
      </Button>
      <Button
        className={cn('flex items-center gap-2 rounded-full hover:text-blue-500', isFavorited && 'text-blue-500')}
        variant={'ghost'}
        onClick={handleFavorite}
        disabled={isThrottlingRef.current && markPostMutation.isPending}
      >
        <Bookmark className="size-5" fill={isFavorited ? 'currentColor' : 'none'} />
        <span className="text-sm">{favoritesCount > 0 ? formatNumber(favoritesCount) : 0}</span>
      </Button>
      <Button
        className="flex items-center gap-2 rounded-full hover:text-green-500"
        variant={'ghost'}
        size={'icon'}
        onClick={() => {
          navigator.clipboard.writeText(`http://localhost:5173/post/${postId}`)
          toast.success('链接已复制到剪贴板')
        }}
      >
        <Share className="size-5" />
      </Button>
    </div>
  )
}

export default PostAction
