import { httpClient } from '@/lib/http'

export * from './post'
export * from './user'
export * from './auth'

//上传图片
interface FileResponse {
  success: boolean
  files: { url: string }[]
  message: string
}

export async function uploadImage(formdata: FormData): Promise<FileResponse> {
  const data = await httpClient.upload<FileResponse>('/upload', formdata)
  return data
}
