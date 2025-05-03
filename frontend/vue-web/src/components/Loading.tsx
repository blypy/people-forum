import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="size-10 animate-spin" style={{ animationDuration: '2000ms' }} />
    </div>
  )
}

export default Loading
