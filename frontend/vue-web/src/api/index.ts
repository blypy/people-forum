export * from './post'
export * from './user'
export * from './auth'

//上传图片
interface FileResponse {
  success: boolean
  files: { url: string }[]
}

export async function uploadImage(formdata: FormData): Promise<FileResponse> {
  const res = await fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formdata
  })
  if (!res.ok) throw new Error('上传图片失败')
  const data = await res.json() //返回图片地址
  return data
}
