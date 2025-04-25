import type { Posts, User } from '@/types'

export async function getUserById(userId: number): Promise<User> {
  const res = await fetch(`http://localhost:3000/users/${userId}`)
  if (!res.ok) throw new Error('获取用户信息失败')
  const data = await res.json()
  if (!data || data.length === 0) {
    throw new Error('用户不存在')
  }
  return data
}

export async function getUserPosts(userId: number): Promise<{ posts: Posts[] }> {
  const res = await fetch(`http://localhost:3000/users/${userId}/posts`)
  if (!res.ok) throw new Error('获取用户文章失败')
  const data = await res.json()
  return data
}

export async function getUserFavoritePosts(userId: number): Promise<{ posts: Posts[] }> {
  const res = await fetch(`http://localhost:3000/users/${userId}/favorites`)
  if (!res.ok) throw new Error('获取用户收藏文章失败')
  const data = await res.json()
  return data
}

export async function getUserLikedPosts(userId: number): Promise<{ posts: Posts[] }> {
  const res = await fetch(`http://localhost:3000/users/${userId}/likes`)
  if (!res.ok) throw new Error('获取用户点赞文章失败')
  const data = await res.json()
  return data
}
