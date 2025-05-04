import { getAllPosts } from '@/api'
import PostCard from '@/components/PostCard'
import { usePosts } from '@/hooks/usePost'
import { QUERY_TAG } from '@/lib/query'

export default function Home() {
  const { posts, loaderRef } = usePosts({
    queryFn: getAllPosts,
    queryKey: QUERY_TAG.POST.ALL
  })

  return (
    <>
      <div>{posts?.map(post => <PostCard post={post} key={post.id} />)}</div>
      <div ref={loaderRef} className="h-px" />
    </>
  )
}
