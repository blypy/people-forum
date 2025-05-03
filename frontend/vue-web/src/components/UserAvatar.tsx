import { useNavigate } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = ({
  avatar,
  userId,
  name,
  className
}: {
  avatar: string
  userId?: string | number
  name?: string
  className?: string
}) => {
  const navigate = useNavigate()
  return (
    <Avatar
      className={`${className}`}
      onClick={e => {
        e.preventDefault()
        if (userId) navigate(`/user/${userId}`)
      }}
    >
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
