import { cn } from '@/lib/utils'
import { useState } from 'react'
import { X, Loader } from 'lucide-react'
import { Button } from './ui/button'

const PreviewImage = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[80vh] p-2" onClick={e => e.stopPropagation()}>
        <img src={src} alt="预览图片" className="object-contain max-h-[80vh] max-w-full" />
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full absolute top-4 right-4 bg-background/80"
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
    <div className="relative h-full">
      {isLoading && (
        <div className="inset-0 flex items-center justify-center bg-background absolute">
          <Loader className="animate-spin size-6" style={{ animationDuration: '2000ms' }} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="object-cover h-full w-full hover:opacity-80 transition-opacity cursor-pointer"
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
            images.length === 1 ? 'grid-cols-1 w-xl' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          )}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="relative rounded-2xl border-2 border-border overflow-hidden aspect-3/2"
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
          'grid mt-3 gap-2',
          images.length === 1
            ? `grid-cols-1 ${className}`
            : images.length === 2
            ? 'grid-cols-2'
            : 'grid-cols-3'
        )}
      >
        {images.map((img, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden border border-border">
            <img src={img} alt="" className="w-full h-full object-cover" onClick={e => e.stopPropagation()} />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full absolute top-2 right-2 bg-background/80 size-7"
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
