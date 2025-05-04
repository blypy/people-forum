import { httpClient } from '@/lib/http'
import type { PostDetails, PostsResponse, PostParams } from '@/types'

//获取帖子数据相关
export async function getAllPosts(page: number) {
  const data = await httpClient.get<PostsResponse>('/posts', {
    params: {
      page
    }
  })
  return data
}

export async function getPostById(postId: number) {
  const data = await httpClient.get<{ post: PostDetails }>(`/posts/${postId}`)
  return data.post
}

export async function getPostByQuery(page: number, query: string) {
  const data = await httpClient.get<PostsResponse>('/posts/search', {
    params: {
      q: query,
      page
    }
  })
  return data
}

//创建帖子
export async function fetchCreatePost(postData: PostParams) {
  const data = await httpClient.post<{ msg: string }, PostParams>('/posts', {
    ...postData
  })

  return data
}
