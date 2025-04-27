import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { memo } from 'react'

const UserAvatar = ({ avatar, name, className }: { avatar: string; name?: string; className?: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}

export default memo(UserAvatar)
