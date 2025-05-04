import { useLoaderData, useParams } from 'react-router'
import PostCard from '@/components/PostCard'
import { usePosts } from '@/hooks/usePost'
import { getUserLikedPosts, getUserPosts } from '@/api'
import { QUERY_TAG } from '@/lib/query'
import Loading from '@/components/Loading'

const PostList = () => {
  const key = useLoaderData()
  const { id } = useParams()
  const { posts, loaderRef, showLoading } = usePosts({
    queryFn: key === QUERY_TAG.USER.POST ? getUserPosts : getUserLikedPosts,
    queryKey: key,
    queryArgs: Number(id)
  })

  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </>
      ) : (
        <div className="flex min-h-[32vh] flex-col items-center justify-center text-2xl">
          <p>暂无内容</p>
        </div>
      )}
      {showLoading && <Loading className="h-15" />}
      <div ref={loaderRef}></div>
    </div>
  )
}

export default PostList
