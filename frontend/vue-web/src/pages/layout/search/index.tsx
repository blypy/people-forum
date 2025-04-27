import { Search as Icon } from 'lucide-react'
import PostCard from '@/components/PostCard'
import { useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { useQueryPost } from '@/hooks/usePost'
import { memo } from 'react'

const SearchIcon = memo(Icon)

const Search = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { data: posts } = useQueryPost(query)

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
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* 搜索栏 */}
      <form
        className="sticky top-0 p-4 border-r border-b z-10 bg-background flex justify-between items-center"
        action={handleSubmit}
      >
        <div className="relative flex-1 mr-2">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
          <input
            placeholder="搜索"
            className="pl-10 h-12 rounded-full bg-muted border-none text-lg w-full"
            name="content"
            defaultValue={query}
          />
        </div>
      </form>

      {query ? (
        <div>
          {posts?.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-2xl">
          <p>要搜点什么</p>
        </div>
      )}

      {posts?.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-2xl">
          <p>暂无内容</p>
        </div>
      )}
    </div>
  )
}

export default Search
