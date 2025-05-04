import { httpClient } from '@/lib/http'
import type { MarkPostParams, PostsResponse, UpdateUserProfileParams, User } from '@/types'

//获取数据相关

//获取用户信息
export async function getUserById(userId: number) {
  const data = await httpClient.get<User>(`/users/${userId}`)
  return data
}

export async function getUserPosts(page: number, userId: number) {
  const data = await httpClient.get<PostsResponse>(`/users/${userId}/posts`, {
    params: {
      page
    }
  })
  return data
}

export async function getUserFavoritePosts(page: number, userId: number) {
  const data = await httpClient.get<PostsResponse>(`/users/${userId}/favorites`, {
    params: {
      page
    }
  })
  return data
}

export async function getUserLikedPosts(page: number, userId: number) {
  const data = await httpClient.get<PostsResponse>(`/users/${userId}/likes`, {
    params: {
      page
    }
  })
  return data
}

// 更新用户资料
export async function fetchUpdateUserProfile(profileData: UpdateUserProfileParams): Promise<{ user: User }> {
  const data = await httpClient.patch<{ user: User }, UpdateUserProfileParams>(`/users/${profileData.userId}`, {
    ...profileData
  })
  return data
}

//更新操作相关
//点赞或收藏帖子
export async function markPost(PostData: MarkPostParams) {
  await httpClient.post<{ msg: string }, { postId: number; userId: number }>(`/interactions/${PostData.type}`, {
    postId: PostData.postId,
    userId: PostData.userId
  })
}

//取消点赞或收藏帖子
export async function unMarkPost(PostData: MarkPostParams) {
  await httpClient.delete<{ msg: string }, { postId: number; userId: number }>(`/interactions/${PostData.type}`, {
    postId: PostData.postId,
    userId: PostData.userId
  })
}
