import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/NotFound.png" alt="404" className="h-96 w-96 object-contain" />
      <Link to={'/'} className="text-accent-foreground">
        <Button variant={'link'}>返回主页</Button>
      </Link>
    </div>
  )
}

type ItemNotFoundProps = {
  type: 'user' | 'post'
  message?: string
}

export const ItemNotFound = ({ type, message }: ItemNotFoundProps) => {
  const navigate = useNavigate()
  const defaultMessage = type === 'user' ? '该用户不存在' : '该帖子不存在'

  return (
    <div className="mx-auto border-r border-border min-h-screen">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'}>
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-xl font-bold">{type === 'user' ? '用户' : '帖子'}</h1>
      </div>

      <div className="flex flex-col items-center justify-center p-8 h-[calc(100vh-64px)]">
        <img src="/NotFound.png" alt="404" className="h-60 w-60 object-contain mb-4" />
        <p className="text-xl font-medium mb-4">{message || defaultMessage}</p>
        <Link to={'/'}>
          <Button className="rounded-full px-6">返回主页</Button>
        </Link>
      </div>
    </div>
  )
}
