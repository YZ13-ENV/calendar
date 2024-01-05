'use client'
import { UserCircle } from 'ui'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import type { User } from 'firebase/auth'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { user as userAPI } from '@/api/user'

type Props = {
    size?: number
}
const User = ({ size=36 }: Props) => {
    const [user] = useAuthState(auth)
    const [isSubscriber, setIsSubscriber] = useState<boolean>(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 786px)' })
    useEffect(() => {
        if (user) userAPI.byId.short(user.uid)
        .then(data => setIsSubscriber(data ? data.isSubscriber : false))
    },[user])
    return (
        <UserCircle size={size} isSubscriber={isSubscriber}
        activeMenu={isTabletOrMobile ? 'mobile' : 'desktop'} user={user as User | undefined} buttonSize='lg' />
    )
}

export default User