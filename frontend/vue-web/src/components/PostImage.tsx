import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Loader, X } from 'lucide-react'
import { Button } from './ui/button'

const Image = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative rounded-2xl border-2 border-border max-w-xl overflow-hidden aspect-3/2">
      {isLoading && (
        <div className="inset-0 flex items-center justify-center bg-background absolute">
          <Loader className="animate-spin size-6" style={{ animationDuration: '2000ms' }} />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className="object-cover h-full w-full"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  )
}

const PostImage = ({ images }: { images?: string[] }) => {
  if (!images || images.length === 0) return null

  return (
    <div className="mb-3 overflow-hidden">
      {images.length > 1 ? (
        <div
          className={cn(
            'grid gap-1',
            images.length === 2 ? 'grid-cols-2' : images.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
          )}
        >
          {images.map((img, index) => (
            <Image key={index} src={img} alt={`图片 ${index + 1}`} />
          ))}
        </div>
      ) : (
        <Image src={images[0]} alt="帖子图片" />
      )}
    </div>
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
              className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              onClick={() => setPreviewImage(img)}
            />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full absolute top-2 right-2 bg-background"
              type="button"
              onClick={() => onRemove(index)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-background/80">
          <div className="relative max-w-4xl max-h-[80vh] p-2">
            <img
              src={previewImage}
              alt="预览图片"
              className="object-cover rounded-lg scale-50"
            />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full absolute top-4 right-4 bg-background/80"
              onClick={() => setPreviewImage(null)}
            >
              <X className="size-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
export { PostImage, CommentImage }
