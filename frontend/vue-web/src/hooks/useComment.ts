import { addComment, addCommentReply } from '@/api/comment'
import { CommentParams } from '@/types'
import { useMutation } from '@tanstack/react-query'

//父评论
export function useCreateComment() {
  return useMutation({
    mutationFn: (comment: CommentParams) => addComment(comment)
  })
}

//子评论
export function useCreateReply() {
  return useMutation({
    mutationFn: (comment: CommentParams & { parentId: number }) => addCommentReply(comment)
  })
}
