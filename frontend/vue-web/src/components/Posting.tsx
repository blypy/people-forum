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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Image, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores/useCurrentUserStore'

const Posting = ({ children, mode }: { children: React.ReactNode; mode: 'post' | 'comment' }) => {
  const imgRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const { currentUser } = useUserStore()

  // 最多三张图
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 3) {
      toast.error('最多选择三张图')
      return
    }

    const file = e.target.files?.[0]

    if (file) {
      // 最大3mb
      if (file.size > 3 * 1024 * 1024) {
        toast.error('图片最大3mb')
        return
      }

      // 创建一个临时的URL来预览图片
      const imageUrl = URL.createObjectURL(file)
      setImages([...images, imageUrl])
      e.target.value = ''
    }
  }

  const handleAction = async (formData: FormData) => {
    const image = formData.get('image') as File
    const content = formData.get('content') as string
    console.log(image, content)

    // 请求

    toast.success('发布成功')
    setImages([])
    setContent('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 border-border bg-card text-card-foreground">
        <form action={handleAction}>
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />

          <DialogHeader className="p-4">
            <div className="flex gap-3 mt-5">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser?.avatar} alt="用户头像" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="w-full">
                <textarea
                  className="w-full resize-none outline-none text-xl min-h-20 mt-1 bg-transparent"
                  placeholder={mode === 'post' ? '有什么新鲜事?' : '要说些什么'}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  name="content"
                />

                {/* 图片 */}
                {images.length > 0 && (
                  <div
                    className={cn(
                      'grid gap-2 mt-3',
                      images.length === 1
                        ? 'grid-cols-1'
                        : images.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                    )}
                  >
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl overflow-hidden border border-border h-48"
                      >
                        <img src={img} className="w-full h-full object-cover" />
                        <Button
                          size="icon"
                          variant={'ghost'}
                          className="rounded-full absolute top-2 right-2 bg-background"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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
              name="image"
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
