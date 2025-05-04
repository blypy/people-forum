import { memo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Search as Icon } from 'lucide-react'
import { toast } from 'sonner'
import PostCard from '@/components/PostCard'
import { usePosts } from '@/hooks/usePost'
import { getPostByQuery } from '@/api'
import { QUERY_TAG } from '@/lib/query'

const SearchIcon = memo(Icon)

const Search = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { posts, loaderRef } = usePosts({ queryFn: getPostByQuery, queryArgs: query, queryKey: QUERY_TAG.POST.QUERY })

  const handleSubmit = async (formData: FormData) => {
    const content = formData.get('content')
    if (!content) {
      toast.error('请输入搜索内容')
      navigate(`/search`)
      return
    }
    if (content === query) {
      toast.info('已经是当前搜索内容')
      return
    }
    navigate(`/search?q=${content}`)
  }

  return (
    <div className="bg-background text-foreground flex h-full flex-col">
      {/* 搜索栏 */}
      <form
        className="bg-background sticky top-0 z-10 flex items-center justify-between border-r border-b p-4"
        action={handleSubmit}
      >
        <div className="relative mr-2 flex-1">
          <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 transform" size={20} />
          <input
            placeholder="搜索"
            className="bg-muted h-12 w-full rounded-full border-none pl-10 text-lg"
            name="content"
            defaultValue={query}
          />
        </div>
      </form>

      {query ? (
        <div>{posts?.map(post => <PostCard post={post} key={post.id} />)}</div>
      ) : (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-2xl">
          <p>要搜点什么</p>
        </div>
      )}

      {posts?.length === 0 && (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-2xl">
          <p>暂无内容</p>
        </div>
      )}
      <div ref={loaderRef} className="h-px" />
    </div>
  )
}

export default Search
