import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { fetchLogin } from '@/api/auth'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { setToken } from '@/lib/token'

const AuthForm = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(formRef.current!)

    toast.promise(
      async () => {
        return await fetchLogin({
          email: formData.get('email') as string,
          password: formData.get('password') as string
        })
      },
      {
        loading: '登录中...',
        success: async res => {
          setToken(res.token)
          useUserStore.getState().setUser()
          navigate('/')
          return '登录成功'
        },
        error: err => {
          setLoading(false)
          const errorMessage = err instanceof Error ? err.message : String(err)
          return `登录失败: ${errorMessage}`
        }
      }
    )
  }

  return (
    <div className="mx-auto flex h-screen w-100 items-center justify-center">
      <form onSubmit={handleSubmit} ref={formRef} className="bg-background border-border rounded-2xl border-2 p-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold">欢迎回来</h1>
          <label className="text-sm">
            邮箱
            <Input className="mt-2 w-xs" type="email" placeholder="请输入邮箱" name="email" />
          </label>
          <label className="text-sm">
            密码
            <Input className="mt-2 w-xs" type="password" placeholder="请输入密码" name="password" />
          </label>
          <Button className="mt-2 h-10 w-xs" type="submit" disabled={loading}>
            登录
          </Button>
        </div>
        <div className="mt-5 text-center text-sm">
          还没有账号？
          <Link to={'/register'} className="ml-1 hover:underline">
            立即注册
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
