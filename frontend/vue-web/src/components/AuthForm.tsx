import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/useCurrentUserStore'

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      const passwordRegex = /^.{6,}$/ //校验密码长度
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 校验邮箱格式

      if (!email) {
        toast.error('请输入邮箱')
        return
      } else if (!emailRegex.test(email)) {
        toast.error('请输入有效的邮箱地址')
        return
      }

      if (!password) {
        toast.error('请输入密码')
        return
      } else if (!passwordRegex.test(password)) {
        toast.error('密码长度必须至少为6位')
        return
      }

      if (isLogin) {
        // 登录逻辑
        const res = await login({
          email,
          password
        })
        useUserStore.getState().setUser(res.user)
        toast.success('登录成功')
        navigate('/')
      } else {
        // 注册逻辑
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      toast.error(errorMessage || (isLogin ? '登录失败' : '注册失败'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[400px] mx-auto mt-40 bg-background border-border rounded-2xl flex flex-col items-center pt-10 justify-between pb-5 text-foreground border-2">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">{isLogin ? '欢迎回来' : '创建账号'}</h1>
          {/* 输入框 */}
          <label className="text-sm">
            邮箱
            <Input className="w-[336px] h-[38px] mt-2" type="email" placeholder="请输入邮箱" name="email" />
          </label>
          <label className="text-sm">
            {isLogin ? '密码' : '设置密码'}
            <Input
              className="w-[336px] h-[38px] mt-2"
              type="password"
              placeholder={isLogin ? '请输入密码' : '请设置密码（至少6位）'}
              name="password"
            />
          </label>
          {!isLogin && <p className="text-sm ">注册成功后即可登录使用</p>}
          {/* 提交 */}
          <Button className="w-[336px] h-10 mt-2" type="submit" disabled={loading}>
            {loading ? (
              <Loader className="animate-spin" style={{ animationDuration: '2000ms' }} />
            ) : isLogin ? (
              '登录'
            ) : (
              '注册'
            )}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm  mt-5">
        {isLogin ? (
          <>
            还没有账号？
            <Link to={'/register'} className="hover:underline ml-1">
              立即注册
            </Link>
          </>
        ) : (
          <>
            已有账号？
            <Link to={'/login'} className="hover:underline ml-1">
              返回登录
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthForm
