import type { MarkPostParams, Pagination, Posts, UpdateUserProfileParams, User } from '@/types'

//获取数据相关
export async function getUserById(userId: number): Promise<User> {
  const res = await fetch(`http://localhost:3000/users/${userId}`)
  if (!res.ok) throw new Error('获取用户信息失败')
  const data = await res.json()
  if (!data || data.length === 0) {
    throw new Error('用户不存在')
  }
  return data
}

export async function getUserPosts(page: number, userId: number): Promise<{ posts: Posts[]; pagination: Pagination }> {
  const res = await fetch(`http://localhost:3000/users/${userId}/posts?page=${page}`)
  if (!res.ok) throw new Error('获取用户文章失败')
  const data = await res.json()
  return data
}

export async function getUserFavoritePosts(
  page: number,
  userId: number
): Promise<{ posts: Posts[]; pagination: Pagination }> {
  const res = await fetch(`http://localhost:3000/users/${userId}/favorites?page=${page}`)
  if (!res.ok) throw new Error('获取用户收藏文章失败')
  const data = await res.json()
  return data
}

export async function getUserLikedPosts(
  page: number,
  userId: number
): Promise<{ posts: Posts[]; pagination: Pagination }> {
  const res = await fetch(`http://localhost:3000/users/${userId}/likes?page=${page}`)
  if (!res.ok) throw new Error('获取用户点赞文章失败')
  const data = await res.json()
  return data
}

// 更新用户资料
export async function fetchUpdateUserProfile(profileData: UpdateUserProfileParams): Promise<{ user: User }> {
  const res = await fetch(`http://localhost:3000/users/${profileData.userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '更新用户资料失败')
  }

  const userData = await res.json()
  return userData
}

//更新操作相关
//点赞或收藏帖子
export async function markPost(PostData: MarkPostParams) {
  const res = await fetch(`http://localhost:3000/interactions/${PostData.type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(PostData)
  })
  if (!res.ok) throw new Error('点赞失败')
  const data = await res.json()
  return data
}

//取消点赞或收藏帖子
export async function unMarkPost(PostData: MarkPostParams) {
  const res = await fetch(`http://localhost:3000/interactions/${PostData.type}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(PostData)
  })
  if (!res.ok) throw new Error('取消点赞失败')
  const data = await res.json()
  return data
}
