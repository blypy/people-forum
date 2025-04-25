import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Loader } from 'lucide-react'

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

export default PostImage
