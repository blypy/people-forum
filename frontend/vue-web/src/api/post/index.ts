import type { PostDetails, Posts } from '@/types'

//获取帖子数据相关
export async function getAllPosts(): Promise<{ posts: Posts[] }> {
  const res = await fetch('http://localhost:3000/posts')
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

export async function getPostByQuery(query: string): Promise<Posts[]> {
  const res = await fetch(`http://localhost:3000/posts/search?q=${query}`)
  if (!res.ok) throw new Error('搜索帖子失败')
  const { posts } = await res.json()
  return posts ?? []
}

//创建帖子
export async function createPost(postData: { content: string; images: string[]; authorId: number }) {
  const res = await fetch('http://localhost:3000/comments/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  if (!res.ok) throw new Error('回复失败')
  const data = await res.json()
  return data
}
