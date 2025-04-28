import Posting from './Posting'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from './ui/button'
import type { Favorites, Like, User } from '@/types'
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react'
import { useMarkPost } from '@/hooks/useUser'

interface PostActionProps {
  postId: number
  comments: number
  likes: Like[]
  favorites: Favorites[]
  currentUser: User | null // 当前登录用户
}

const PostAction = ({ postId, comments, likes, favorites, currentUser }: PostActionProps) => {
  const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === currentUser?.id)) //喜欢状态
  const [isFavorited, setIsFavorited] = useState(
    favorites.some(favorite => favorite.userId === currentUser?.id)
  ) //收藏状态
  const [likesCount, setLikesCount] = useState(likes.length) //喜欢数量
  const [favoritesCount, setFavoritesCount] = useState(favorites.length) //收藏数量
  const mutation = useMarkPost()

  // 点赞逻辑
  const handleLike = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }

    mutation.mutate({ userId: currentUser.id, postId: postId, type: 'like' })

    //更新本地喜欢
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikesCount(prev => (newLikedState ? prev + 1 : prev - 1))
  }

  // 收藏逻辑
  const handleFavorite = () => {
    if (!currentUser) {
      toast.error('请先登录')
      return
    }
    mutation.mutate({ userId: currentUser.id, postId: postId, type: 'favorite' })
    // 更新本地收藏
    const newFavoritedState = !isFavorited
    setIsFavorited(newFavoritedState)
    setFavoritesCount(prev => (newFavoritedState ? prev + 1 : prev - 1))
  }

  return (
    <div className="flex justify-between mt-2" onClick={e => e.preventDefault()}>
      <Posting mode={'comment'}>
        <Button
          className="flex items-center gap-2 hover:text-blue-500 rounded-full"
          variant={'ghost'}
          size={comments > 0 ? 'default' : 'icon'}
        >
          <MessageSquare className="size-5" />
          {comments > 0 && <span className="text-sm">{comments}</span>}
        </Button>
      </Posting>
      <Button
        className={cn('flex items-center gap-2 hover:text-red-500 rounded-full', isLiked && 'text-red-500')}
        variant={'ghost'}
        size={likesCount > 0 ? 'default' : 'icon'}
        onClick={handleLike}
      >
        <Heart className="size-5" fill={isLiked ? 'currentColor' : 'none'} />
        {likesCount > 0 && <span className="text-sm">{likesCount}</span>}
      </Button>
      <Button
        className={cn(
          'flex items-center gap-2 hover:text-blue-500 rounded-full',
          isFavorited && 'text-blue-500'
        )}
        variant={'ghost'}
        size={favoritesCount > 0 ? 'default' : 'icon'}
        onClick={handleFavorite}
      >
        <Bookmark className="size-5" fill={isFavorited ? 'currentColor' : 'none'} />
        {favoritesCount > 0 && <span className="text-sm">{favoritesCount}</span>}
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
