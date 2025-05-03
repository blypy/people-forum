import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getUserById,
  getUserPosts,
  getUserFavoritePosts,
  getUserLikedPosts,
  markPost,
  unMarkPost,
  fetchUpdateUserProfile
} from '@/api'
import { QUERY_TAG } from '@/lib/query'
import { MarkPostParams, UpdateUserProfileParams } from '@/types'
import queryClient from '@/lib/query'

//根据用户id获取用户信息
export function useUserById(userId: number) {
  return useQuery({
    queryKey: [QUERY_TAG.USER.PROFILE, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    retry: false
  })
}

//根据用户id获取用户收藏的帖子
export function useUserFavoritePosts(userId: number) {
  return useQuery({
    queryKey: [QUERY_TAG.USER.FAVORITE, userId],
    queryFn: () => getUserFavoritePosts(userId),
    enabled: !!userId
  })
}

//根据不同key返回不同类型帖子
export function useUserPostsByKey(key: string, userId: number) {
  const queryFn = () => {
    switch (key) {
      case QUERY_TAG.USER.POST:
        return getUserPosts(userId) //用户发布
      case QUERY_TAG.USER.LIKE:
        return getUserLikedPosts(userId) //用户喜欢
    }
  }

  return useQuery({
    queryKey: [key, userId],
    queryFn,
    enabled: !!userId
  })
}

// 更新用户资料
export function useUpdateUserProfile() {
  return useMutation({
    mutationFn: (profileData: UpdateUserProfileParams) => fetchUpdateUserProfile(profileData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.USER.PROFILE, variables.userId] })
    }
  })
}

//给帖子点赞/收藏
export function useMarkPost() {
  return useMutation({
    mutationFn: (PostData: MarkPostParams) => markPost(PostData)
  })
}

export function useUnMarkPost() {
  return useMutation({
    mutationFn: (PostData: MarkPostParams) => unMarkPost(PostData)
  })
}
