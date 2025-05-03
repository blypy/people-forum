import { Link } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { fetchLogout } from '@/api'
import { toast } from 'sonner'
import { useUserStore } from '@/stores/useCurrentUserStore'

const DropMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to={'/login'}>添加已有账号</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const res = await fetchLogout()
              useUserStore.getState().clearUser()
              toast.success(res.message)
            }}
          >
            退出当前账号
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropMenu
