//添加评论相关
import { httpClient } from '@/lib/http'
import { CommentParams } from '@/types'

//添加父评论
export async function addComment(commentData: CommentParams) {
  const data = await httpClient.post<{ msg: string }, CommentParams>(`/comments`, {
    ...commentData
  })

  return data
}

//添加子评论
export async function addCommentReply(commentData: CommentParams & { parentId: number }) {
  const data = await httpClient.post<{ msg: string }, CommentParams & { parentId: number }>(`/comments/reply`, {
    ...commentData
  })
  return data
}
