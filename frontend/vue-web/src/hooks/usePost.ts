import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { fetchCreatePost, getPostById } from '@/api'
import queryClient, { QUERY_TAG } from '@/lib/query'
import type { Pagination, PostParams, Posts } from '@/types'
import { useEffect, useMemo, useRef } from 'react'

interface UsePostsResult {
  posts: Posts[]
  loaderRef: React.RefObject<HTMLDivElement | null>
  status: 'error' | 'success' | 'pending'
}

//函数重载
export function usePosts({
  queryFn,
  queryKey
}: {
  queryFn: () => Promise<{ posts: Posts[]; pagination: Pagination }>
  queryKey: string
}): UsePostsResult

export function usePosts<T extends string | number>({
  queryFn,
  queryKey,
  queryArgs
}: {
  queryFn: (page: number, args: T) => Promise<{ posts: Posts[]; pagination: Pagination }>
  queryKey: string
  queryArgs: T
}): UsePostsResult

export function usePosts<T extends string | number | undefined = undefined>({
  queryFn,
  queryArgs,
  queryKey
}: {
  queryFn: (page: number, args?: T) => Promise<{ posts: Posts[]; pagination: Pagination }>
  queryArgs?: T
  queryKey: string
}): UsePostsResult {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey, queryArgs],
    queryFn: ({ pageParam }) => queryFn(pageParam, queryArgs),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { pagination } = lastPage
      return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined
    }
  })
  const posts = useMemo(() => {
    return data?.pages.flatMap(page => page.posts) || []
  }, [data])

  const loaderRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    )

    const loader = loaderRef.current
    if (loader) observer.observe(loader)

    return () => {
      if (loader) observer.unobserve(loader)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    posts,
    loaderRef,
    status
  }
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

//创建帖子
export function useCreatePost() {
  return useMutation({
    mutationFn: (postData: PostParams) => fetchCreatePost(postData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_TAG.POST.ALL] })
  })
}
