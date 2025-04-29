import { useRef, useState } from 'react'
import { toast } from 'sonner'

export const useFile = () => {
  const imgRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const maxCount = 3
  const maxSizeMB = 3

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= maxCount) {
      toast.error(`最多选择${maxCount}张图`)
      return
    }

    const file = e.target.files?.[0]

    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`图片最大${maxSizeMB}MB`)
        return
      }
      const imageUrl = URL.createObjectURL(file)
      setImages(prev => [...prev, imageUrl])
      setImageFiles(prev => [...prev, file])
    }

    if (imgRef.current) {
      imgRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  return {
    imgRef,
    images,
    imageFiles,
    setImages,
    setImageFiles,
    handleImageChange,
    removeImage
  }
}
