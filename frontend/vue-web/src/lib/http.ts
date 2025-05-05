import { getToken } from './token'

const BASE_URL = 'http://localhost:3000'
// 需要携带token的API路径
const AUTH_PATHS = ['/users', '/posts', '/comments', '/upload', '/interactions']

// 请求配置接口
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>
  needToken?: boolean
}

// 响应解析
async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `请求失败: ${response.status}`)
  }
  return (await response.json()) as T
}

// 判断是否需要携带token
function isAuthRequired(url: string, needToken?: boolean): boolean {
  if (needToken !== undefined) return needToken
  return AUTH_PATHS.some(path => url.includes(path))
}

// 构建完整URL
function buildUrl(endpoint: string, params?: Record<string, string | number>): string {
  const url = new URL(`${BASE_URL}${endpoint}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  return url.toString()
}

// HTTP请求函数
async function http<T extends object>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params, needToken, ...customConfig } = config
  const url = buildUrl(endpoint, params)

  // 构建请求配置
  const headers = new Headers(customConfig.headers || {})
  if (!(customConfig.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  // 判断是否需要携带token
  if (isAuthRequired(endpoint, needToken)) {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const requestConfig: RequestInit = {
    ...customConfig,
    headers
  }

  const response = await fetch(url, requestConfig)
  return await parseResponse<T>(response)
}

// HTTP请求方法封装
export const httpClient = {
  get: <T extends object>(endpoint: string, config?: RequestConfig) => http<T>(endpoint, { ...config, method: 'GET' }),

  post: <T extends object, D extends object = Record<string, unknown>>(
    endpoint: string,
    data?: D,
    config?: RequestConfig
  ) =>
    http<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    }),

  patch: <T extends object, D extends object = Record<string, unknown>>(
    endpoint: string,
    data?: D,
    config?: RequestConfig
  ) =>
    http<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    }),

  delete: <T extends object, D extends object = Record<string, unknown>>(
    endpoint: string,
    data?: D,
    config?: RequestConfig
  ) =>
    http<T>(endpoint, {
      ...config,
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined
    }),

  // 文件上传专用方法
  upload: <T extends object>(endpoint: string, formData: FormData, config?: RequestConfig) => {
    const uploadConfig = { ...config, method: 'POST', body: formData }
    return http<T>(endpoint, {
      ...uploadConfig,
      needToken: true
    })
  }
}
