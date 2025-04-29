/* 接口返回数据的类型 */

// 帖子详情类型
export interface PostDetails {
  id: number //帖子id
  createdAt: Date //创建时间
  content: string //帖子内容
  images?: string[] //可选 图片地址
  authorId: number //作者id

  author: User //作者信息
  comments: Comments[] //评论列表
  likes: Like[] //喜欢
  favorites: Favorites[] //收藏
}

//帖子列表类型
export interface Posts {
  id: number //帖子id
  createdAt: Date //创建时间
  content: string //帖子内容
  images?: string[] //可选 图片地址
  authorId: number //作者id

  author: User //作者信息
  likes: Like[] //喜欢
  favorites: Favorites[] //收藏
  _count: {
    comments: number //评论数量
  }
}

// 用户类型
export interface User {
  id: number //用户id
  avatar: string //用户头像
  username: string //用户名
  handle: string //用户唯一Id标识
  email: string //邮箱
  createdAt?: Date //账号创建时间
  // password?: string //密码 不应该返回给客户端
  bio: string //个人简介
  _count: {
    posts: number //帖子数量
    likes: number //喜欢数量
    favorites: number //收藏数量
  }
}

//评论类型
// 父评论
export interface Comments {
  id: number //评论id
  content: string //评论内容
  createdAt: Date //评论创建时间
  replies?: CommentReplies[] //子评论列表
  postId: number //评论文章id
  userId: number //评论用户id
  images?: string[] //评论图片

  user: User //评论用户信息
}
//子评论
export interface CommentReplies {
  id: number //评论id
  content: string //评论内容
  createdAt: Date //评论创建时间
  postId?: number //评论文章id
  userId?: number //评论用户id
  parentId: number //父评论id
  images?: string[] //评论图片

  user: User //子评论用户信息
}

//点赞
export interface Like {
  id: number
  userId?: number //点赞的用户id 对比登录用户id判断帖子是否点赞
  postId?: number //点赞的帖子
}

export interface Favorites {
  id: number
  userId?: number
  postId?: number
}

//注册提交的数据
export interface AuthData {
  email: string
  password: string
}

//点赞收藏提交的数据
export interface MarkPostParams {
  userId: number
  postId: number
  type: 'like' | 'favorite'
}

//评论提交的数据
export interface CommentParams {
  userId: number
  postId: number
  content: string
  images?: string[]
}

//创建帖子提交的数据
export interface PostParams {
  content: string
  images?: string[]
  authorId: number
}
