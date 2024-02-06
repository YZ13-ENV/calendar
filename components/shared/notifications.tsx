'use client'
import { auth } from '@/utils/app'
import { Notifications } from 'ui'

const NotificationsWrapper = () => {
  return (
    <div className='shrink-0'>
      <Notifications auth={auth} />
    </div>
  )
}

export default NotificationsWrapper