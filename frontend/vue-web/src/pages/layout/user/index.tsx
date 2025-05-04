import { memo, useState } from 'react'
import { Link, useParams, useNavigate, Navigate } from 'react-router'
import { Outlet } from 'react-router'
import { ArrowLeft as arrow, Calendar as time } from 'lucide-react'
import Loading from '@/components/Loading'
import { ItemNotFound } from '@/components/NotFound'
import UserAvatar from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import EditProfileForm from '@/components/EditProfileForm'
import { useUserById } from '@/hooks/useUser'
import { useUserStore } from '@/stores/useCurrentUserStore'
import { formatDate } from '@/lib/utils'
import type { User } from '@/types'

const ArrowLeft = memo(arrow)
const Calendar = memo(time)

const TopLink = ({ name, postCount }: { name: string; postCount: number }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-background border-border sticky top-0 z-10 flex items-center border-b p-4">
      <Button className="mr-6 rounded-full" onClick={() => navigate(-1)} variant={'ghost'} size={'icon'}>
        <ArrowLeft className="size-5" />
      </Button>
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-muted-foreground text-sm">{postCount}条帖子</p>
      </div>
    </div>
  )
}

const UserProfile = memo(({ user }: { user: User }) => {
  const currentUser = useUserStore(state => state.currentUser)
  const isOwnProfile = currentUser?.id === user.id
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

      <div className="border-border relative border-b p-4">
        <div className="absolute -top-16 left-4 flex items-end gap-4">
          <UserAvatar name={user.username} avatar={user.avatar} className="border-background h-32 w-32 border-4" />
        </div>
        {isOwnProfile && (
          <DialogTrigger asChild>
            <Button variant="outline" className="absolute top-4 right-4 rounded-full">
              编辑个人资料
            </Button>
          </DialogTrigger>
        )}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-muted-foreground">{user?.handle}</p>

          <p className="my-3 whitespace-pre-wrap">{user?.bio || '暂无简介'}</p>
          <div className="text-muted-foreground flex items-center gap-1">
            <Calendar className="size-4" />
            <span>加入于 {formatDate(user?.createdAt || new Date())}</span>
          </div>
        </div>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑个人资料</DialogTitle>
          <DialogDescription>在这里修改你的个人信息。点击保存以应用更改。</DialogDescription>
        </DialogHeader>
        <EditProfileForm user={currentUser!} onSubmitSuccess={() => setIsEditDialogOpen(false)} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              取消
            </Button>
          </DialogClose>
          <Button type="submit" form="edit-profile-form">
            保存更改
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

const ActiveTabBar = () => {
  const [activeTab, setActiveTab] = useState('posts')
  return (
    <div className="border-border border-b">
      <div className="flex">
        <Link
          to={''}
          className={`flex-1 px-4 py-3 text-center font-medium ${
            activeTab === 'posts' ? 'border-primary border-b-2' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          帖子
        </Link>
        <Link
          to={'like'}
          className={`flex-1 px-4 py-3 text-center font-medium ${
            activeTab === 'likes' ? 'border-primary border-b-2' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('likes')}
        >
          喜欢
        </Link>
      </div>
    </div>
  )
}

export default function User() {
  const { id } = useParams() //userid
  const { data: user, isError, isLoading } = useUserById(Number(id))
  if (id === 'undefined') return <Navigate to="/login" replace />
  if (isLoading) return <Loading />
  if (isError || !user) return <ItemNotFound type="user" />

  return (
    <div className="border-border mx-auto min-h-screen border-r">
      <TopLink name={user.username} postCount={user._count.posts} />
      <UserProfile user={user} />
      <ActiveTabBar />
      <Outlet />
    </div>
  )
}
