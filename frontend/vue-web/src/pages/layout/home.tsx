import { getAllPosts } from '@/api'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import { usePosts } from '@/hooks/usePost'
import { QUERY_TAG } from '@/lib/query'

export default function Home() {
  const { posts, loaderRef, showLoading } = usePosts({
    queryFn: getAllPosts,
    queryKey: QUERY_TAG.POST.ALL
  })

  return (
    <>
      <div>{posts?.map(post => <PostCard post={post} key={post.id} />)}</div>
      {showLoading && <Loading className="h-15" />}
      <div ref={loaderRef} className="h-px" />
    </>
  )
}
