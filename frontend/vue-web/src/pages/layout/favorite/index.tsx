import { getUserFavoritePosts } from '@/api'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import { usePosts } from '@/hooks/usePost'
import { QUERY_TAG } from '@/lib/query'
import { useUserStore } from '@/stores/useCurrentUserStore'

export default function Favorite() {
  const currentUser = useUserStore(state => state.currentUser)
  const { posts, loaderRef, isLoading, showLoading } = usePosts({
    queryFn: getUserFavoritePosts,
    queryArgs: currentUser!.id,
    queryKey: QUERY_TAG.USER.FAVORITE
  })

  if (isLoading) return <Loading />

  return (
    <>
      {posts.length > 0 ? (
        <>
          <div>{posts?.map(post => <PostCard post={post} key={post.id} />)}</div>
          {showLoading && <Loading className="h-15" />}
          <div ref={loaderRef} className="h-px" />
        </>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center text-2xl">
          <p>还没收藏过帖子</p>
        </div>
      )}
    </>
  )
}
