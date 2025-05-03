import { useMutation } from '@tanstack/react-query'
import { addComment, addCommentReply } from '@/api/comment'
import { CommentParams } from '@/types'
import queryClient, { QUERY_TAG } from '@/lib/query'

//父评论
export function useCreateComment() {
  return useMutation({
    mutationFn: (comment: CommentParams) => addComment(comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.DETAIL] })
  })
}

//子评论
export function useCreateReply() {
  return useMutation({
    mutationFn: (comment: CommentParams & { parentId: number }) => addCommentReply(comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.DETAIL] })
  })
}
