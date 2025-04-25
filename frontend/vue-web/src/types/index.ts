//帖子类型
export interface Posts {
  id?: number //帖子id
  createdAt: Date //创建时间
  content: string //帖子内容
  images?: string[] //可选 图片地址
  authorId: number //作者id

  user: User //用户信息
  comments: Comments[] //评论列表
  likes: Like[] //喜欢
  favorites: Favorites[] //收藏
}

//用户类型
export interface User {
  id?: number //用户id
  avatar: string //用户头像
  username: string //用户名
  handle: string //用户唯一Id/邮箱
  createdAt?: Date //账号创建时间
  // password?: string //密码 不应该返回给客户端
  bio?: string //个人简介

  likes?: Like[] //喜欢的帖子
  favorites?: Favorites[] //收藏的帖子
  posts: Posts[] //用户发布的帖子
}

//评论类型
// 父评论
export interface Comments {
  id?: number //评论id
  content: string //评论内容
  createdAt: Date //评论创建时间
  replies?: CommentReplies[] //子评论列表
  postId?: number //评论文章id
  userId?: number //评论用户id

  user: User //评论用户信息
}
//子评论
export interface CommentReplies {
  id?: number //评论id
  content: string //评论内容
  createdAt: Date //评论创建时间
  postId?: number //评论文章id
  userId?: number //评论用户id
  parentId: number //父评论id

  user: User //子评论用户信息
}

//点赞
export interface Like {
  id: number
  userId?: number //点赞的用户
  postId?: number //点赞的帖子
}

export interface Favorites {
  id: number
  userId?: number
  postId?: number
}
