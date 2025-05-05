import { fetchRegister } from '@/api'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useFile } from '@/hooks/useFile'
import { regex } from '@/lib/regex'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { useUpload } from '@/hooks/useUpload'
import { Camera, User } from 'lucide-react'
import { setToken } from '@/lib/token'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })
  const { imgRef, images, imageFiles, handleImageChange, removeImage } = useFile(1)
  const [loading, setLoading] = useState(false)
  const { uploadFiles } = useUpload()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    let fileUrl: string[] = []
    if (images.length > 0) {
      const uploadResult = await uploadFiles(imageFiles)
      if (!uploadResult.success) return toast.error(uploadResult.message || '上传图片失败')
      fileUrl = uploadResult.urls
    }

    toast.promise(
      async () => {
        return await fetchRegister({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          avatar: fileUrl
        })
      },
      {
        loading: '注册中...',
        success: res => {
          setToken(res.token)
          useUserStore.getState().setUser()
          navigate('/')
          return '注册成功'
        },
        error: err => {
          setLoading(false)
          const errorMessage = err instanceof Error ? err.message : String(err)
          return `注册失败: ${errorMessage}`
        }
      }
    )
  }

  const nextStep = () => {
    switch (step) {
      case 1:
        if (!formData.email || !formData.password) return toast.error('请输入邮箱和密码')
        if (!regex.emailRegex.test(formData.email)) return toast.error('请输入正确的邮箱')
        if (!regex.passwordRegex.test(formData.password)) return toast.error('密码长度6-20位，必须包含字母和数字')
        break
      case 2:
        if (!formData.username) return toast.error('请输入用户名')
        if (!regex.usernameRegex.test(formData.username))
          return toast.error('用户名长度3-9位，只允许字母、数字、下划线')
        break
    }
    setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  return (
    <div className="mx-auto flex h-screen w-100 items-center justify-center">
      <form className="bg-background border-border w-full rounded-2xl border-2 p-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold">创建账号</h1>
          {step === 1 && (
            <>
              <label className="text-sm">
                邮箱
                <Input
                  className="mt-2 w-xs"
                  type="email"
                  placeholder="请输入真实邮箱"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label className="text-sm">
                设置密码
                <Input
                  className="mt-2 w-xs"
                  type="password"
                  placeholder="请输入密码(不少于6位)"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
          {step === 2 && (
            <label className="text-sm">
              用户名
              <Input
                className="mt-2"
                type="text"
                placeholder="请输入用户名"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          )}
          {step === 3 && (
            <div className="relative mx-auto mb-10 size-24">
              {/* 头像预览 */}
              <div className="text-muted-foreground mb-4 text-sm">设置头像(可选)</div>
              <div className="group border-border relative h-full w-full overflow-hidden rounded-full border">
                {images[0] ? (
                  <img
                    src={images[0]}
                    alt="头像预览"
                    className="h-full w-full object-cover transition-all group-hover:opacity-80"
                  />
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center">
                    <User className="text-muted-foreground h-12 w-12" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    removeImage()
                    imgRef.current?.click()
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Camera className="h-6 w-6 text-white" />
                </button>
              </div>
              <input ref={imgRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          )}

          {/* 提交 */}
          <div className="flex justify-between">
            <Button className="mt-2 h-10" onClick={prevStep} disabled={step === 1 || loading} type="button">
              上一步
            </Button>
            {step < 3 ? (
              <Button className="mt-2 h-10" onClick={nextStep} type="button">
                下一步
              </Button>
            ) : (
              <button
                type="submit"
                className={`border-border bg-primary text-primary-foreground mt-2 h-10 rounded-md border px-5 ${loading ? 'disabled:opacity-50' : 'hover:bg-primary/90 active:scale-95'}`}
                disabled={loading}
              >
                注册
              </button>
            )}
          </div>
        </div>
        <div className="mt-7 text-center text-sm">
          <Button variant={'link'} disabled={loading} type="button">
            <Link to={'/login'} className="ml-1 hover:underline">
              已有账号？返回登录
            </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
