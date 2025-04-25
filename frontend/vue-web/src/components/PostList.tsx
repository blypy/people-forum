import { useLoaderData, useParams } from 'react-router-dom'
import PostCard from './PostCard'
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
        <div className="flex flex-col items-center justify-center h-40 text-2xl text-gray-500">
          <p>暂无内容</p>
        </div>
      )}
    </div>
  )
}

export default PostList
