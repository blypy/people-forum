import { useQuery } from '@tanstack/react-query'
import { getUserById, getUserPosts, getUserFavoritePosts, getUserLikedPosts } from '@/api'
import { useUserStore } from '@/stores/useCurrentUserStore'

//根据用户id获取用户信息
export function useUserById(userId: number) {
  return useQuery({
    queryKey: ['USER-PROFILE', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })
}

//根据用户id获取用户发布的帖子
export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: ['USER-POSTS', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId
  })
}
//根据不同key返回不同类型帖子
export function useUserPostsByKey(key: string, userId: number) {
  const { currentUser } = useUserStore()

  const queryFn = () => {
    switch (key) {
      case 'USER-POSTS':
        return getUserPosts(userId)
      case 'USER-FAVORITE':
        return getUserFavoritePosts(currentUser?.id || 0) //这里传登录用户的id
      case 'USER-LIKES':
        return getUserLikedPosts(userId)
    }
  }

  return useQuery({
    queryKey: [key, userId, currentUser],
    queryFn,
    enabled: !!userId
  })
}
