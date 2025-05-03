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
  const res = await fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formdata
  })
  return await res.json()
}
