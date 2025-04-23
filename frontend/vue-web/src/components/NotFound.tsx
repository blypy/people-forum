import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/NotFound.png" alt="404" className="h-96 w-96 object-contain" />
      <Link to={'/'} className="text-accent-foreground">
        <Button variant={'link'}>返回主页</Button>
      </Link>
    </div>
  )
}

export default NotFound
