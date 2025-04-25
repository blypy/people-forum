import type { Posts } from '@/types'

export async function getAllPosts(): Promise<{ posts: Posts[] }> {
  const res = await fetch('http://localhost:3000/posts')
  if (!res.ok) throw new Error('获取全部帖子失败')
  const data = await res.json()
  return data
}

export async function getPostById(postId: number): Promise<Posts> {
  const res = await fetch(`http://localhost:3000/posts/${postId}`)
  if (!res.ok) throw new Error('获取帖子详情失败')
  const data = await res.json()
  if (!data || data.length === 0) {
    throw new Error('帖子不存在')
  }
  const { post } = data
  return post
}

export async function getPostByQuery(query: string): Promise<Posts[]> {
  const res = await fetch(`http://localhost:3000/posts/search?q=${query}`)
  if (!res.ok) throw new Error('搜索帖子失败')
  const { posts } = await res.json()
  return posts ?? []
}
