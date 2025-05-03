import { useState } from 'react'
import { X, Loader } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const PreviewImage = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-h-[80vh] max-w-4xl p-2" onClick={e => e.stopPropagation()}>
        <img src={src} alt="预览图片" className="max-h-[80vh] max-w-full object-contain" />
        <Button
          size="icon"
          variant="ghost"
          className="bg-background/80 absolute top-4 right-4 rounded-full"
          onClick={e => {
            e.preventDefault()
            onClose()
          }}
        >
          <X className="size-6" />
        </Button>
      </div>
    </div>
  )
}

const Image = ({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="h-full w-full">
      {isLoading && (
        <div className="bg-background flex h-100 items-center justify-center">
          <Loader className="size-6 animate-spin" style={{ animationDuration: '2000ms' }} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="h-full w-full cursor-pointer object-cover transition-opacity hover:opacity-80"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        onClick={onClick}
      />
    </div>
  )
}

//帖子的图片
const PostImage = ({ images }: { images?: string[] }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  if (!images || images.length === 0) return null

  return (
    <>
      <div className="mb-3 overflow-hidden">
        <div
          className={cn(
            'grid gap-2',
            images.length === 1 ? 'w-xl grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          )}
        >
          {images?.map((img, index) => (
            <div
              key={index}
              className="border-border relative overflow-hidden rounded-2xl border-2"
              onClick={e => e.preventDefault()}
            >
              <Image
                src={img}
                alt={`图片 ${index + 1}`}
                onClick={() => {
                  setPreviewImage(img)
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {previewImage && <PreviewImage src={previewImage} onClose={() => setPreviewImage(null)} />}
    </>
  )
}

//帖子评论输入框里的图片
const CommentImage = ({
  images,
  onRemove,
  className
}: {
  images: string[]
  onRemove: (index: number) => void
  className?: string
}) => {
  if (!images.length) return null

  return (
    <>
      <div
        className={cn(
          'mt-3 grid gap-2',
          images.length === 1 ? `grid-cols-1 ${className}` : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
        )}
      >
        {images.map((img, index) => (
          <div key={index} className="border-border relative overflow-hidden rounded-xl border">
            <img src={img} alt="" className="h-full w-full object-cover" onClick={e => e.stopPropagation()} />
            <Button
              size="icon"
              variant="ghost"
              className="bg-background/80 absolute top-2 right-2 size-7 rounded-full"
              type="button"
              onClick={e => {
                e.stopPropagation()
                onRemove(index)
              }}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
export { PostImage, CommentImage }
