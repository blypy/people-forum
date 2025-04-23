import { cn } from '@/lib/utils'

const PostImage = ({ images }: { images?: string[] }) => {
  if (!images || images.length === 0) return null

  return (
    <div className="mb-3 rounded-2xl overflow-hidden border border-border">
      {images.length > 1 ? (
        <div
          className={cn(
            'grid gap-1',
            images.length === 2 ? 'grid-cols-2' : images.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
          )}
        >
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden border border-border min-h-[250px]">
              <img
                src={img}
                alt={`图片 ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="max-h-[500px]">
          <img src={images[0]} alt="帖子图片" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
    </div>
  )
}

export default PostImage
