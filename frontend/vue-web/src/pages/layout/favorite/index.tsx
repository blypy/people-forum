import PostCard from '@/components/PostCard'
import { useUserFavoritePosts } from '@/hooks/useUser'
import { useUserStore } from '@/stores/useCurrentUserStore'

export default function Favorite() {
  const currentUser = useUserStore(state => state.currentUser)
  const { data } = useUserFavoritePosts(currentUser?.id ?? 0)
  const posts = data?.posts || []

  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts?.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-2xl">
          <p>还没收藏过帖子</p>
        </div>
      )}
    </>
  )
}
