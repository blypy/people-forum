import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchCreatePost, getAllPosts, getPostById, getPostByQuery } from '@/api'
import queryClient, { QUERY_TAG } from '@/lib/query'
import type { PostParams } from '@/types'

//获取全部文章
export function useAllPosts() {
  return useQuery({ queryKey: [QUERY_TAG.POST.ALL], queryFn: getAllPosts })
}

//根据帖子id获取帖子信息
export function usePostById(postId: number) {
  return useQuery({
    queryKey: [QUERY_TAG.POST.DETAIL, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    retry: false
  })
}

//搜索帖子
export function useQueryPost(query: string) {
  return useQuery({
    queryKey: [QUERY_TAG.POST.QUERY, query],
    queryFn: () => getPostByQuery(query),
    enabled: !!query
  })
}

//创建帖子
export function useCreatePost() {
  return useMutation({
    mutationFn: (postData: PostParams) => fetchCreatePost(postData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.ALL] })
  })
}
