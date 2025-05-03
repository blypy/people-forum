# React + TypeScript + Vite

## 接口预期返回的数据

类型信息说明见：/src/types/index.ts

### 登录：

```json
{
  "success": true,
  "message": "登录成功",
  "user": {
    "id": 5,
    "username": "113",
    "email": "113@example.com",
    "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=113"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzQ1NzQwNDQ1LCJleHAiOjE3NDU4MjY4NDV9.o2sDZmQAqK0NKzoUxfskMbKunZpDWna3TXwgDN81A88" //也可以是session
}
```

### 注册：

### 获取所有帖子：

```json
{
  "posts": [
    {
      "id": 6,
      "createdAt": "2025-04-24T15:53:14.597Z",
      "content": "有没有人可以推荐一些好用的摄影应用？",
      "images": [],
      "authorId": 2,
      "author": {
        "id": 2,
        "username": "李四",
        "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
        "handle": "lisi"
      },
      "_count": { "comments": 0 },
      "likes": [],
      "favorites": []
    },
    {
      "id": 5,
      "createdAt": "2025-04-24T15:53:14.596Z",
      "content": "分享一个我最近学到的编程技巧...",
      "images": [],
      "authorId": 1,
      "author": {
        "id": 1,
        "username": "张三",
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
        "handle": "zhangsan"
      },
      "_count": { "comments": 0 },
      "likes": [],
      "favorites": []
    },
    {
      "id": 4,
      "createdAt": "2025-04-24T15:53:14.594Z",
      "content": "刚从云南旅游回来，风景太美了，推荐大家有机会一定要去！",
      "images": [
        "https://picsum.photos/id/241/800/600",
        "https://picsum.photos/id/242/800/600",
        "https://picsum.photos/id/243/800/600"
      ],
      "authorId": 4,
      "author": {
        "id": 4,
        "username": "赵六",
        "avatar": "https://randomuser.me/api/portraits/women/4.jpg",
        "handle": "zhaoliu"
      },
      "_count": { "comments": 1 },
      "likes": [],
      "favorites": [{ "id": 2, "userId": 1, "postId": 4, "createdAt": "2025-04-25T00:12:29.658Z" }]
    },
    {
      "id": 3,
      "createdAt": "2025-04-24T15:53:14.593Z",
      "content": "今天尝试了一家新开的餐厅，味道真的很不错！",
      "images": ["https://picsum.photos/id/240/800/600"],
      "authorId": 3,
      "author": {
        "id": 3,
        "username": "王五",
        "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
        "handle": "wangwu"
      },
      "_count": { "comments": 1 },
      "likes": [{ "id": 5, "userId": 1, "postId": 3, "createdAt": "2025-04-25T00:12:29.663Z" }],
      "favorites": [{ "id": 3, "userId": 2, "postId": 3, "createdAt": "2025-04-25T00:12:29.658Z" }]
    },
    {
      "id": 2,
      "createdAt": "2025-04-24T15:53:14.592Z",
      "content": "分享一下我最近拍摄的照片，大家觉得怎么样？",
      "images": ["https://picsum.photos/id/238/800/600", "https://picsum.photos/id/239/800/600"],
      "authorId": 2,
      "author": {
        "id": 2,
        "username": "李四",
        "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
        "handle": "lisi"
      },
      "_count": { "comments": 1 },
      "likes": [
        { "id": 3, "userId": 1, "postId": 2, "createdAt": "2025-04-25T00:12:29.663Z" },
        { "id": 4, "userId": 4, "postId": 2, "createdAt": "2025-04-25T00:12:29.663Z" }
      ],
      "favorites": []
    },
    {
      "id": 1,
      "createdAt": "2025-04-24T15:53:14.591Z",
      "content": "今天学习了Vue和React，非常高效的前端开发工具！",
      "images": ["https://picsum.photos/id/237/800/600"],
      "authorId": 1,
      "author": {
        "id": 1,
        "username": "张三",
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
        "handle": "zhangsan"
      },
      "_count": { "comments": 1 },
      "likes": [
        { "id": 1, "userId": 2, "postId": 1, "createdAt": "2025-04-25T00:12:29.663Z" },
        { "id": 2, "userId": 3, "postId": 1, "createdAt": "2025-04-25T00:12:29.663Z" }
      ],
      "favorites": [{ "id": 1, "userId": 3, "postId": 1, "createdAt": "2025-04-25T00:12:29.658Z" }]
    }
  ],
  "pagination": { "page": 1, "pageSize": 10, "total": 6, "totalPages": 1 } //分页信息：页码 每页帖子数量 帖子总数 总页数
}
```

### 获取帖子详情:

```json
{
  "post": {
    "id": 1,
    "createdAt": "2025-04-24T15:53:14.591Z",
    "content": "今天学习了Vue和React，非常高效的前端开发工具！",
    "images": ["https://picsum.photos/id/237/800/600"],
    "authorId": 1,
    "author": {
      "id": 1,
      "username": "张三",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
      "handle": "zhangsan"
    },
    "comments": [
      {
        "id": 1,
        "content": "非常棒的分享，我也在学习这个！",
        "createdAt": "2025-04-24T15:53:14.598Z",
        "postId": 1,
        "userId": 2,
        "images": [],
        "user": {
          "id": 2,
          "username": "李四",
          "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
          "handle": "lisi"
        },
        "replies": [
          {
            "id": 1,
            "content": "你学习到什么程度了？要不要一起交流",
            "createdAt": "2025-04-24T15:53:14.603Z",
            "postId": 1,
            "userId": 3,
            "parentId": 1,
            "images": [],
            "user": {
              "id": 3,
              "username": "王五",
              "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
              "handle": "wangwu"
            }
          }
        ]
      }
    ],
    "likes": [
      { "id": 1, "userId": 2, "postId": 1, "createdAt": "2025-04-25T00:12:29.663Z" },
      { "id": 2, "userId": 3, "postId": 1, "createdAt": "2025-04-25T00:12:29.663Z" }
    ],
    "favorites": [{ "id": 1, "userId": 3, "postId": 1, "createdAt": "2025-04-25T00:12:29.658Z" }]
  }
}
```

### 获取用户信息：

```json
{
  "id": 1,
  "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
  "username": "张三",
  "email": "zhangsan@example.com",
  "handle": "zhangsan",
  "createdAt": "2025-04-24T15:53:14.583Z",
  "bio": "热爱编程和户外活动",
  "_count": {
    "posts": 2,
    "likes": 2,
    "favorites": 1
  }
}
```

### 获取用户喜欢帖子

```json
{
  "posts": [
    {
      "id": 3,
      "createdAt": "2025-04-24T15:53:14.593Z",
      "content": "今天尝试了一家新开的餐厅，味道真的很不错！",
      "images": ["https://picsum.photos/id/240/800/600"],
      "authorId": 3,
      "author": {
        "id": 3,
        "username": "王五",
        "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
        "handle": "wangwu",
        "email": "wangwu@example.com"
      },
      "_count": {
        "comments": 1
      },
      "likes": [
        {
          "id": 5,
          "userId": 1,
          "postId": 3,
          "createdAt": "2025-04-25T00:12:29.663Z"
        }
      ],
      "favorites": [
        {
          "id": 3,
          "userId": 2,
          "postId": 3,
          "createdAt": "2025-04-25T00:12:29.658Z"
        }
      ]
    },
    {
      "id": 2,
      "createdAt": "2025-04-24T15:53:14.592Z",
      "content": "分享一下我最近拍摄的照片，大家觉得怎么样？",
      "images": ["https://picsum.photos/id/238/800/600", "https://picsum.photos/id/239/800/600"],
      "authorId": 2,
      "author": {
        "id": 2,
        "username": "李四",
        "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
        "handle": "lisi",
        "email": "lisi@example.com"
      },
      "_count": {
        "comments": 1
      },
      "likes": [
        {
          "id": 3,
          "userId": 1,
          "postId": 2,
          "createdAt": "2025-04-25T00:12:29.663Z"
        },
        {
          "id": 4,
          "userId": 4,
          "postId": 2,
          "createdAt": "2025-04-25T00:12:29.663Z"
        }
      ],
      "favorites": []
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

### 获取用户收藏帖子

```json
{
  "posts": [
    {
      "id": 4,
      "createdAt": "2025-04-24T15:53:14.594Z",
      "content": "刚从云南旅游回来，风景太美了，推荐大家有机会一定要去！",
      "images": [
        "https://picsum.photos/id/241/800/600",
        "https://picsum.photos/id/242/800/600",
        "https://picsum.photos/id/243/800/600"
      ],
      "authorId": 4,
      "author": {
        "id": 4,
        "username": "赵六",
        "avatar": "https://randomuser.me/api/portraits/women/4.jpg",
        "handle": "zhaoliu",
        "email": "zhaoliu@example.com"
      },
      "_count": { "comments": 1 },
      "likes": [],
      "favorites": [{ "id": 2, "userId": 1, "postId": 4, "createdAt": "2025-04-25T00:12:29.658Z" }]
    }
  ],
  "pagination": { "page": 1, "pageSize": 10, "total": 1, "totalPages": 1 }
}
```

### 获取用户发布帖子

```json
{
  "posts": [
    {
      "id": 5,
      "createdAt": "2025-04-24T15:53:14.596Z",
      "content": "分享一个我最近学到的编程技巧...",
      "images": [],
      "authorId": 1,
      "author": {
        "id": 1,
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
        "username": "张三",
        "handle": "zhangsan",
        "createdAt": "2025-04-24T15:53:14.583Z",
        "password": "password123",
        "bio": "热爱编程和户外活动",
        "email": "zhangsan@example.com"
      },
      "likes": [],
      "favorites": [],
      "_count": { "comments": 0 }
    },
    {
      "id": 1,
      "createdAt": "2025-04-24T15:53:14.591Z",
      "content": "今天学习了Vue和React，非常高效的前端开发工具！",
      "images": ["https://picsum.photos/id/237/800/600"],
      "authorId": 1,
      "author": {
        "id": 1,
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
        "username": "张三",
        "handle": "zhangsan",
        "createdAt": "2025-04-24T15:53:14.583Z",
        "password": "password123",
        "bio": "热爱编程和户外活动",
        "email": "zhangsan@example.com"
      },
      "likes": [
        { "id": 1, "userId": 2, "postId": 1, "createdAt": "2025-04-25T00:12:29.663Z" },
        { "id": 2, "userId": 3, "postId": 1, "createdAt": "2025-04-25T00:12:29.663Z" }
      ],
      "favorites": [{ "id": 1, "userId": 3, "postId": 1, "createdAt": "2025-04-25T00:12:29.658Z" }],
      "_count": { "comments": 1 }
    }
  ],
  "pagination": { "page": 1, "pageSize": 10, "total": 2, "totalPages": 1 }
}
```
