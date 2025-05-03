import PostCard from '@/components/PostCard'
import { useAllPosts } from '@/hooks/usePost'

export default function Home() {
  const posts = useAllPosts().data?.posts
  return <div>{posts?.map(post => <PostCard post={post} key={post.id} />)}</div>
}
