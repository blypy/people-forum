import { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { useFile } from '@/hooks/useFile'
import { useCreateComment, useCreateReply } from '@/hooks/useComment'
import { toast } from 'sonner'
import { uploadImg } from '@/lib/utils'
import UserAvatar from './UserAvatar'
import { CommentImage } from './PostImage'
import { Button } from './ui/button'
import { Image } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

const CommentForm = forwardRef<
  { focus: () => void },
  { className?: string; postId: number; commentId?: number; type: 'reply' | 'parent'; onClose?: () => void }
>(({ className, postId, commentId, type, onClose }, ref) => {
  const currentUser = useUserStore(state => state.currentUser)
  const { imgRef, images, imageFiles, removeImage, handleImageChange, setImages } = useFile()
  const [commentContent, setCommentContent] = useState('')
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const createComment = useCreateComment()
  const createReply = useCreateReply()
  const debouncedLength = useDebounce(commentContent.trim().length, 500)

  useImperativeHandle(ref, () => ({
    focus: () => {
      commentRef.current?.focus()
    }
  }))

  if (!currentUser) {
    return null
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    let fileUrl: string[] = []
    if (commentContent.trim().length >= 200) {
      toast.error('评论最大200字')
      return
    }
    if (images.length > 0) fileUrl = await uploadImg(imageFiles)

    if (type === 'parent') {
      //提交父评论
      createComment.mutate({
        content: commentContent,
        images: fileUrl || [],
        userId: currentUser.id,
        postId
      })
      toast.success('评论成功')
    } else {
      //提交子评论
      createReply.mutate({
        content: commentContent,
        images: fileUrl || [],
        userId: currentUser.id,
        postId,
        parentId: commentId!
      })
      toast.success('回复成功')
    }

    setCommentContent('')
    setImages([])
  }

  return (
    <form className={`flex items-start gap-3 ${className}`} onSubmit={handleSubmitComment}>
      <UserAvatar avatar={currentUser?.avatar || ''} className="size-10" />
      <div className="flex-1">
        <textarea
          name="content"
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          placeholder="发布你的回复"
          className={`w-full border-b border-border outline-none bg-transparent resize-none ${
            commentContent ? 'h-full' : 'h-8'
          }`}
          ref={commentRef}
          maxLength={200}
        />
        <CommentImage images={images} onRemove={removeImage} className="w-xl" />
        <div className="flex mt-2 justify-between">
          <input type="file" ref={imgRef} className="hidden" onChange={handleImageChange} name="images" />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-8"
            type="button"
            onClick={() => imgRef.current?.click()}
          >
            <Image className="size-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              type="button"
              onClick={() => {
                setCommentContent('')
                onClose?.()
              }}
            >
              取消
            </Button>
            <Button className="rounded-full text-sm" size="sm" type="submit" disabled={!debouncedLength}>
              回复{debouncedLength > 0 ? `(${debouncedLength}字)` : ''}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
})

export default CommentForm
