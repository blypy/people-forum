import { Loader2 } from 'lucide-react'

const Loading = ({ className = 'h-screen' }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="size-10 animate-spin" style={{ animationDuration: '2000ms' }} />
    </div>
  )
}

export default Loading
