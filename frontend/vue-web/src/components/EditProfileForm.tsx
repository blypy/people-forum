import { useState } from 'react'
import { User, Camera } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useFile } from '@/hooks/useFile'
import { useUpload } from '@/hooks/useUpload'
import { useUpdateUserProfile } from '@/hooks/useUser'
import { toast } from 'sonner'
import type { User as UserType } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useUserStore } from '@/stores/useCurrentUserStore'

export default function EditProfileForm({ user, onSubmitSuccess }: { user: UserType; onSubmitSuccess?: () => void }) {
  const [username, setUsername] = useState(user.username || '')
  const [bio, setBio] = useState(user.bio || '')
  const { imgRef, images, imageFiles, handleImageChange, removeImage } = useFile(1)
  const { uploadFiles } = useUpload()
  const updateProfileMutation = useUpdateUserProfile()
  const avatarPreview = images[0] || user.avatar

  const bioLength = useDebounce(bio.length, 500)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) return toast.error('用户名不能为空')

    let avatarUrl = user.avatar

    toast.promise(
      async () => {
        if (images.length > 0) {
          const uploadResult = await uploadFiles(imageFiles)
          avatarUrl = uploadResult.urls[0]
        }

        return await updateProfileMutation.mutateAsync({
          userId: user.id,
          username: username.trim(),
          bio: bio.trim(),
          avatar: avatarUrl
        })
      },
      {
        loading: '更新个人信息中...',
        success: () => {
          useUserStore.getState().setUser()
          onSubmitSuccess?.()
          return '更新个人信息成功'
        },
        error: err => {
          const errorMessage = err instanceof Error ? err.message : String(err)
          return `更新个人信息失败：${errorMessage}`
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 py-4" id="edit-profile-form">
      <div className="mx-auto mb-2 text-center">
        <div className="relative mx-auto h-24 w-24">
          <div className="group border-border relative h-full w-full overflow-hidden rounded-full border">
            {avatarPreview ? (
              <img
                src={avatarPreview}
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
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          用户名
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-2 w-full"
            placeholder="请输入用户名"
            maxLength={9}
          />
        </label>
      </div>

      {/* 简介输入 */}
      <div className="space-y-2">
        <label className="text-sm">
          简介
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 border-border mt-2 w-full resize-none rounded-md border px-3 py-2 text-sm transition-[color,box-shadow] focus-visible:ring-[1px]"
            placeholder="介绍一下自己吧"
            rows={3}
            maxLength={50}
          />
        </label>
        <div className="text-muted-foreground text-right text-xs">{bioLength}/50</div>
      </div>
    </form>
  )
}
