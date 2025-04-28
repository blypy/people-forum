import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserById, getUserPosts, getUserFavoritePosts, getUserLikedPosts, markPost } from '@/api'
import { MarkPostParams } from '@/types'

//根据用户id获取用户信息
export function useUserById(userId: number) {
  return useQuery({
    queryKey: ['USER-PROFILE', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })
}

//根据用户id获取用户收藏的帖子
export function useUserFavoritePosts(userId: number) {
  return useQuery({
    queryKey: ['USER-FAVORITE', userId],
    queryFn: () => getUserFavoritePosts(userId),
    enabled: !!userId
  })
}

//根据不同key返回不同类型帖子
export function useUserPostsByKey(key: string, userId: number) {
  const queryFn = () => {
    switch (key) {
      case 'USER-POSTS':
        return getUserPosts(userId) //用户发布
      case 'USER-LIKES':
        return getUserLikedPosts(userId) //用户喜欢
    }
  }

  return useQuery({
    queryKey: [key, userId],
    queryFn,
    enabled: !!userId
  })
}

//给帖子点赞/收藏
export function useMarkPost() {
  return useMutation({
    mutationFn: (PostData: MarkPostParams) => markPost(PostData)
  })
}
