import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { TopUser } from '../types/user'

interface TopUserItemProps{
    user: TopUser;
}

const TopUserItem = ({user}: TopUserItemProps) => {
  return (
    <div className='flex justify-between'>
        {user.user.avatar ?
            <img className='w-7 h-7 rounded-md' src={user.user.avatar} alt="" />
            : <UserCircleIcon className='w-7 h-7 rounded-md'/>
        }
        <div>
             <div className="font-medium text-gray-700 text-sm capitalize">
                {user.user.name}
            </div>
            <div className="text-gray-500 text-xs">{user.user.email}</div>
        </div>
        <div className='font-medium text-gray-700 text-sm capitalize'>
            {user.amount}
        </div>
        <div className='font-medium text-gray-700 text-sm capitalize'>
            {(user.total / 1_000_000).toFixed(1)} VND
        </div>
    </div>
  )
}

export default TopUserItem