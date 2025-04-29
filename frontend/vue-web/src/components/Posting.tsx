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
import { useCreatePost } from '@/hooks/usePost'
import { uploadImg } from '@/lib/utils'
import { useCreateComment } from '@/hooks/useComment'
import { useDebounce } from '@/hooks/useDebounce'

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
  const createComment = useCreateComment()
  const createPost = useCreatePost()
  const { imgRef, images, imageFiles, removeImage, setImages, setImageFiles, handleImageChange } = useFile()

  // 使用防抖hook计算内容长度
  const debouncedLength = useDebounce(content.trim().length, 500)

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !currentUser) {
      toast.error('请先登录')
      return
    }
    setOpen(isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      toast.error('请先登录')
      return
    }

    let fileUrl: string[] = []
    if (images.length > 0) fileUrl = await uploadImg(imageFiles)

    if (content.trim().length >= 200) {
      toast.error('内容最多200字')
      return
    }

    if (mode === 'post') {
      createPost.mutate({ content, images: fileUrl || [], authorId: currentUser.id })
      if (createPost.isError) {
        toast.error('发布帖子失败')
        return
      }
      toast.success('发布成功')
    } else if (mode === 'comment' && postId) {
      createComment.mutate({
        content,
        images: fileUrl || [],
        userId: currentUser.id,
        postId
      })
      if (createComment.isError) {
        toast.error('回复失败')
        return
      }
      toast.success('回复成功')
    }

    setOpen(false)
    setImages([])
    setImageFiles([])
    setContent('')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 border-border bg-card text-card-foreground">
        <form onSubmit={handleSubmit}>
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />

          <DialogHeader className="p-4">
            <div className="flex gap-3 mt-5">
              <UserAvatar
                avatar={currentUser?.avatar || ''}
                name={currentUser?.username || ''}
                className="size-10"
              />

              <div className="w-full max-h-[80vh] overflow-y-auto pr-8">
                <textarea
                  className="w-full resize-none outline-none text-xl min-h-20 mt-1 bg-transparent"
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
            />
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
