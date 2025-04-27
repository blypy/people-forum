import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Link } from 'react-router'

const DropMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to={'/login'}>添加已有账号</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>退出当前账号</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropMenu
