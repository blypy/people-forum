import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const DropMenu = () => {
  return (
    <div className="mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 hover:bg-secondary active:bg-secondary/80 rounded-full py-2 px-4 transition-colors">
            <Avatar className="hover:scale-110 transition-transform">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="xl:block hidden">用户名</p>
            <MoreHorizontal className="xl:block hidden text-xl ml-5 self-end" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>添加已有账号</DropdownMenuItem>
          <DropdownMenuItem>退出当前账号</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropMenu
