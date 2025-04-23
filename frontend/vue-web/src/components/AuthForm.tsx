import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Link } from 'react-router-dom'

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    setLoading(true)
    console.log(email, password)
  }

  return (
    <div className="w-[400px] mx-auto mt-20 bg-white shadow-lg rounded-2xl flex flex-col items-center pt-10 justify-between pb-5">
      <form action={handleSubmit}>
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
              minLength={6}
              name="password"
            />
          </label>
          {!isLogin && <p className="text-sm text-gray-500">注册成功后即可登录使用</p>}
          {/* 提交 */}
          <Button className="w-[336px] h-10 mt-2 hover:bg-blue-200" type="submit" disabled={loading}>
            {loading ? '处理中...' : isLogin ? '登录' : '注册'}
          </Button>
        </div>
      </form>

      {/* 分割线 */}
      <div className="flex items-center w-[336px] my-5">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
        <span className="mx-4 text-sm text-gray-500">其他登录方式</span>
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-5">
        {isLogin ? (
          <>
            还没有账号？
            <Link to={'/register'} className="text-blue-300 hover:underline ml-1">
              立即注册
            </Link>
          </>
        ) : (
          <>
            已有账号？
            <Link to={'/login'} className="text-blue-300 hover:underline ml-1">
              返回登录
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthForm
