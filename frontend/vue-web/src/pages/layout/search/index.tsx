import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import PostCard from '@/components/PostCard'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { useQueryPost } from '@/hooks/usePost'

const Search = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [content, setContent] = useState(query)
  const { data: posts } = useQueryPost(query)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) {
      toast.error('请输入搜索内容')
    }
    navigate(`/search?q=${content}`)
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* 搜索栏 */}
      <form
        className="sticky top-0 p-4 border-r border-b z-10 bg-background flex justify-between items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-1 mr-2">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            placeholder="搜索"
            className="pl-10 h-12 rounded-full bg-muted border-none text-lg"
            onChange={e => setContent(e.target.value)}
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
        <div className="text-center text-2xl pt-52 h-screen border-r">搜索内容</div>
      )}

      {posts?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-2xl text-gray-500">
          <p>暂无内容</p>
        </div>
      )}
    </div>
  )
}

export default Search
