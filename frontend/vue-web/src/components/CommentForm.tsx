import { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import { Image } from 'lucide-react'
import { toast } from 'sonner'
import { CommentImage } from './PostImage'
import UserAvatar from './UserAvatar'
import { Button } from './ui/button'
import { useCreateComment, useCreateReply } from '@/hooks/useComment'
import { useDebounce } from '@/hooks/useDebounce'
import { useFile } from '@/hooks/useFile'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { useUpload } from '@/hooks/useUpload'

const CommentForm = forwardRef<
  { focus: () => void },
  {
    className?: string
    postId: number
    commentId?: number
    type: 'reply' | 'parent'
    onClose?: () => void
  }
>(({ className, postId, commentId, type, onClose }, ref) => {
  const currentUser = useUserStore(state => state.currentUser)
  const { imgRef, images, imageFiles, removeImage, handleImageChange } = useFile()
  const [commentContent, setCommentContent] = useState('')
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const createCommentMutation = useCreateComment()
  const createReplyMutation = useCreateReply()
  const debouncedLength = useDebounce(commentContent.trim().length, 500)
  const { uploadFiles } = useUpload()

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
    if (commentContent.trim().length >= 200) return toast.error('评论最大200字')

    let fileUrl: string[] = []
    if (images.length > 0) {
      const uploadResult = await uploadFiles(imageFiles)
      if (!uploadResult.success) return toast.error(uploadResult.message || '上传图片失败')
      fileUrl = uploadResult.urls
    }

    if (type === 'parent') {
      //提交父评论
      await createCommentMutation.mutateAsync({
        content: commentContent,
        images: fileUrl,
        userId: currentUser.id,
        postId
      })
      toast.success('评论成功')
    } else {
      //提交子评论
      await createReplyMutation.mutateAsync({
        content: commentContent,
        images: fileUrl,
        userId: currentUser.id,
        postId,
        parentId: commentId!
      })
      toast.success('回复成功')
    }

    setCommentContent('')
    removeImage()
  }

  return (
    <form className={`flex items-start gap-3 ${className}`} onSubmit={handleSubmitComment}>
      <UserAvatar
        avatar={currentUser?.avatar || ''}
        className="size-10"
        userId={currentUser.id}
        name={currentUser.username}
      />
      <div className="flex-1">
        <textarea
          name="content"
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          placeholder="发布你的回复"
          className={`border-border w-full resize-none border-b bg-transparent outline-none ${
            commentContent ? 'h-full' : 'h-8'
          }`}
          ref={commentRef}
          maxLength={200}
        />
        <CommentImage images={images} onRemove={removeImage} className="w-xl" />
        <div className="mt-2 flex justify-between">
          <input type="file" ref={imgRef} className="hidden" onChange={handleImageChange} name="images" multiple />
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
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
                removeImage()
                onClose?.()
              }}
            >
              取消
            </Button>
            <Button
              className="rounded-full text-sm"
              size="sm"
              type="submit"
              disabled={!debouncedLength && images.length === 0}
            >
              回复{debouncedLength > 0 ? `(${debouncedLength}字)` : ''}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
})

export default CommentForm
