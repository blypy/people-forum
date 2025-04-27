import { cn } from '@/lib/utils'
import { useState } from 'react'
import { X, Loader } from 'lucide-react'
import { Button } from './ui/button'

// 提取公共的图片预览组件
const PreviewImage = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[80vh] p-2" onClick={e => e.stopPropagation()}>
        <img src={src} alt="预览图片" className="object-contain max-h-[80vh] max-w-full" />
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full absolute top-4 right-4 bg-background/80"
          onClick={onClose}
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

const PostImage = ({ images }: { images?: string[] }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  if (!images || images.length === 0) return null

  return (
    <>
      <div className="mb-3 overflow-hidden">
        {images.length > 1 ? (
          <div
            className={cn(
              'grid gap-2',
              images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            )}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-border overflow-hidden aspect-3/2"
              >
                <Image src={img} alt={`图片 ${index + 1}`} onClick={() => setPreviewImage(img)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative rounded-2xl border-2 border-border overflow-hidden aspect-3/2">
            <Image src={images[0]} alt="帖子图片" onClick={() => setPreviewImage(images[0])} />
          </div>
        )}
      </div>
      {previewImage && <PreviewImage src={previewImage} onClose={() => setPreviewImage(null)} />}
    </>
  )
}

interface CommentImageProps {
  images: string[]
  onRemove: (index: number) => void
  className?: string
}

const CommentImage = ({ images, onRemove, className }: CommentImageProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  if (!images.length) return null

  return (
    <>
      <div
        className={cn(
          'grid mt-3 gap-2',
          images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3',
          className
        )}
      >
        {images.map((img, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden border border-border max-h-full">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
              onClick={e => {
                e.stopPropagation()
                setPreviewImage(img)
              }}
            />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full absolute top-2 right-2 bg-background"
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

      {previewImage && <PreviewImage src={previewImage} onClose={() => setPreviewImage(null)} />}
    </>
  )
}
export { PostImage, CommentImage }
