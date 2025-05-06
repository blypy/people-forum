import { uploadImage } from '@/api'

export const useUpload = () => {
  const uploadFiles = async (files: File[]): Promise<{ urls: string[] }> => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })

    const res = await uploadImage(formData)
    const urls = res.files.map(file => file.url)
    return { urls }
  }

  return {
    uploadFiles
  }
}
