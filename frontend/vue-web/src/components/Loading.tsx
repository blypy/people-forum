import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin size-10" style={{ animationDuration: '2000ms' }} />
    </div>
  )
}

export default Loading
