//添加评论相关
import { CommentParams } from '@/types'

//添加父评论
export async function addComment(commentData: CommentParams) {
  const res = await fetch('http://localhost:3000/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
  if (!res.ok) throw new Error('发布评论失败')
  const data = await res.json()
  return data
}

//添加子评论
export async function addCommentReply(commentData: CommentParams & { parentId: number }) {
  const res = await fetch('http://localhost:3000/comments/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
  if (!res.ok) throw new Error('回复失败')
  const data = await res.json()
  return data
}
