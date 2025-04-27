import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Image } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useUserStore } from '@/stores/useCurrentUserStore'
import UserAvatar from './UserAvatar'
import { CommentImage } from './PostImage'
import { useFile } from '@/hooks/useFile'

const Posting = ({ children, mode }: { children: React.ReactNode; mode: 'post' | 'comment' }) => {
  const [content, setContent] = useState('')
  const { imgRef, images, handleImageChange, removeImage, setImages } = useFile()
  const { currentUser } = useUserStore()

  const handleAction = async (formData: FormData) => {
    const image = formData.get('images') as File
    const content = formData.get('content') as string
    console.log(image, content)

    // 请求

    toast.success('发布成功')
    setImages([])
    setContent('')
  }

  if (!currentUser) {
    toast.error('请先登录')
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 border-border bg-card text-card-foreground">
        <form action={handleAction}>
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />

          <DialogHeader className="p-4">
            <div className="flex gap-3 mt-5">
              <UserAvatar avatar={currentUser?.avatar} name={currentUser?.username} className="size-10" />

              <div className="w-full max-h-[80vh] overflow-y-auto pr-8">
                <textarea
                  className="w-full resize-none outline-none text-xl min-h-20 mt-1 bg-transparent"
                  placeholder={mode === 'post' ? '有什么新鲜事?' : '要说些什么'}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  name="content"
                />
                {/* 图片 */}
                <CommentImage images={images} onRemove={removeImage} />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="p-4 border-t border-border flex-row justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-8"
              type="button"
              onClick={() => imgRef.current?.click()}
            >
              <Image className="size-5" />
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={imgRef}
              className="hidden"
              onChange={handleImageChange}
              name="images"
            />
            <Button disabled={!content.trim()} className="rounded-full" type="submit">
              {mode === 'post' ? '发帖' : '回复'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Posting
