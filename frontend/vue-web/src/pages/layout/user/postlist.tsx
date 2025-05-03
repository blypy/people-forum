import { useLoaderData, useParams } from 'react-router'
import PostCard from '@/components/PostCard'
import { useUserPostsByKey } from '@/hooks/useUser'

const PostList = () => {
  const key = useLoaderData()
  const { id } = useParams()
  const { data } = useUserPostsByKey(key, Number(id))
  const posts = data?.posts || []

  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[32vh] text-2xl">
          <p>暂无内容</p>
        </div>
      )}
    </div>
  )
}

export default PostList
