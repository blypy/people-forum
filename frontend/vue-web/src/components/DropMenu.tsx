import { Link, useNavigate } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { fetchLogout } from '@/api'
import { toast } from 'sonner'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { removeToken } from '@/lib/token'

const DropMenu = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
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
              removeToken()
              useUserStore.getState().clearUser()
              navigate('/')
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
