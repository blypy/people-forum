import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserById, markPost, unMarkPost, fetchUpdateUserProfile } from '@/api'
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
    mutationFn: (PostData: MarkPostParams) => markPost(PostData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.DETAIL, variables.postId] })
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.ALL] })
    }
  })
}

export function useUnMarkPost() {
  return useMutation({
    mutationFn: (PostData: MarkPostParams) => unMarkPost(PostData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.DETAIL, variables.postId] })
      queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.ALL] })
    }
  })
}
