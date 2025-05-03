import { useState } from 'react'
import { Image } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { CommentImage } from './PostImage'
import UserAvatar from './UserAvatar'
import { useCreateComment } from '@/hooks/useComment'
import { useDebounce } from '@/hooks/useDebounce'
import { useFile } from '@/hooks/useFile'
import { useCreatePost } from '@/hooks/usePost'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { useUpload } from '@/hooks/useUpload'

const Posting = ({
  children,
  mode,
  postId
}: {
  children: React.ReactNode
  mode: 'post' | 'comment'
  postId?: number
}) => {
  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)
  const { currentUser } = useUserStore()
  const createCommentMutation = useCreateComment()
  const createPostMutation = useCreatePost()
  const debouncedLength = useDebounce(content.trim().length, 500)
  const { imgRef, images, imageFiles, removeImage, handleImageChange } = useFile()
  const { uploadFiles } = useUpload()

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !currentUser) return toast.error('请先登录')
    setOpen(isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (content.trim().length >= 200) {
      toast.error('内容最多200字')
      return
    }
    let fileUrl: string[] = []
    if (images.length > 0) {
      const uploadResult = await uploadFiles(imageFiles)
      if (!uploadResult.success) return toast.error(uploadResult.message || '上传图片失败')
      fileUrl = uploadResult.urls
    }

    toast.promise(
      async () => {
        let msg = ''
        if (mode === 'post') {
          await createPostMutation.mutateAsync({ content, images: fileUrl, authorId: currentUser!.id })
          msg = '发布成功'
        }
        if (mode === 'comment' && postId) {
          await createCommentMutation.mutateAsync({
            content,
            images: fileUrl,
            userId: currentUser!.id,
            postId
          })
          msg = '评论成功'
        }
        return msg
      },
      {
        loading: '发布中...',
        success: msg => msg,
        error: err => {
          const msg = err instanceof Error ? err.message : '发布失败'
          return mode === 'post' ? `发布失败：${msg}` : `评论失败：${msg}`
        }
      }
    )

    setOpen(false)
    setContent('')
    removeImage()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground p-0 sm:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />

          <DialogHeader className="p-4">
            <div className="mt-5 flex gap-3">
              <UserAvatar avatar={currentUser?.avatar || ''} name={currentUser?.username || ''} className="size-10" />

              <div className="max-h-[80vh] w-full overflow-y-auto pr-8">
                <textarea
                  className="mt-1 min-h-20 w-full resize-none bg-transparent text-xl outline-none"
                  placeholder={mode === 'post' ? '有什么新鲜事?' : '要说些什么'}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  maxLength={200}
                />
                {/* 图片 */}
                <CommentImage images={images} onRemove={removeImage} />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="border-border flex-row justify-between border-t p-4">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              type="button"
              onClick={() => imgRef.current?.click()}
            >
              <Image className="size-5" />
            </Button>
            <input type="file" accept="image/*" ref={imgRef} className="hidden" onChange={handleImageChange} />
            <Button disabled={!debouncedLength} className="rounded-full" type="submit">
              {mode === 'post'
                ? debouncedLength > 0
                  ? `发帖(${debouncedLength})`
                  : '发帖'
                : debouncedLength > 0
                  ? `回复(${debouncedLength})`
                  : '回复'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Posting
