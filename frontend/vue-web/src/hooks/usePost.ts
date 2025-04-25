import { useQuery } from '@tanstack/react-query'
import { getAllPosts, getPostById, getPostByQuery } from '@/api'

//获取全部文章
export function useAllPosts() {
  return useQuery({ queryKey: ['POST-ALL'], queryFn: getAllPosts })
}

//根据帖子id获取帖子信息
export function usePostById(postId: number) {
  return useQuery({
    queryKey: ['POST-DETAIL', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })
}

//搜索帖子
export function useQueryPost(query: string) {
  return useQuery({
    queryKey: ['POST-QUERY', query],
    queryFn: () => getPostByQuery(query),
    enabled: !!query
  })
}
