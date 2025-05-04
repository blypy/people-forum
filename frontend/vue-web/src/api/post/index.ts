import type { Pagination, PostDetails, PostParams, Posts } from '@/types'

//获取帖子数据相关
export async function getAllPosts(page: number): Promise<{ posts: Posts[]; pagination: Pagination }> {
  const res = await fetch(`http://localhost:3000/posts?page=${page}`)
  if (!res.ok) throw new Error('获取全部帖子失败')
  const data = await res.json()
  return data
}

export async function getPostById(postId: number): Promise<PostDetails> {
  const res = await fetch(`http://localhost:3000/posts/${postId}`)
  if (!res.ok) throw new Error('获取帖子详情失败')
  const data = await res.json()
  if (!data || data.length === 0) {
    throw new Error('帖子不存在')
  }
  const { post } = data
  return post
}

export async function getPostByQuery(page: number, query: string): Promise<{ posts: Posts[]; pagination: Pagination }> {
  const res = await fetch(`http://localhost:3000/posts/search?q=${query}&page=${page}`)
  if (!res.ok) throw new Error('搜索帖子失败')
  const data = await res.json()
  return data
}

//创建帖子
export async function fetchCreatePost(postData: PostParams): Promise<{ msg: string }> {
  const res = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message)
  }
  const data = await res.json()
  return data
}
