import { Link, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
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
    <div className="border-border mx-auto min-h-screen border-r">
      {/* 顶部导航 */}
      <div className="bg-background border-border sticky top-0 z-10 flex items-center border-b p-4">
        <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'}>
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-xl font-bold">{type === 'user' ? '用户' : '帖子'}</h1>
      </div>

      <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center p-8">
        <img src="/NotFound.png" alt="404" className="mb-4 h-60 w-60 object-contain" />
        <p className="mb-4 text-xl font-medium">{message || defaultMessage}</p>
        <Link to={'/'}>
          <Button className="rounded-full px-6">返回主页</Button>
        </Link>
      </div>
    </div>
  )
}
