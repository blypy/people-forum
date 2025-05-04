import { uploadImage } from '@/api'

interface UploadResult {
  success: boolean
  urls: string[]
  message: string | null
}

interface UseUploadHookResult {
  uploadFiles: (files: File[]) => Promise<UploadResult>
}

export const useUpload = (): UseUploadHookResult => {
  const uploadFiles = async (files: File[]): Promise<UploadResult> => {
    if (!files.length) {
      return { success: true, urls: [], message: null }
    }

    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })

    const res = await uploadImage(formData)
    const urls = res.files.map(file => file.url)
    return { success: true, urls: urls, message: null }
  }

  return {
    uploadFiles
  }
}
