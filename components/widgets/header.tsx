'use client'
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import Link from "next/link"
import { BiMenu, BiX } from "react-icons/bi"
import { ProjectsGrid } from "ui"
import User from "../shared/user-circle"
import { DateTime } from "luxon"

type Props = {
    providedDate?: string
    mode?: 'month' | 'day'
}
const Header = ({ providedDate, mode='month' }: Props) => {
    const searchParams = useSearchParams()
    const enableSideMenu = searchParams.get('side')
    const todayDate = providedDate ? providedDate : searchParams.get('date')
    const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
    const currentMonth = nowDate.monthLong
    const year = nowDate.year
    const actualDate = DateTime.now().setLocale('ru')
    const todayKey = actualDate.toFormat('dd-MM-yyyy')
    const linkByMode = mode === 'month' ? `?date=${todayKey}` : `/day/${todayKey}`
    return (
        <header className="w-full h-16 px-3 flex items-center shrink-0 border-b border-x bg-card justify-between">
            <div className="w-fit h-fit flex items-center gap-3">
                <Button size='icon' variant='ghost'>
                    <Link href={enableSideMenu ? '/' : '?side=true'}>
                    {
                        enableSideMenu
                        ? <BiX size={24} />
                        : <BiMenu size={24} />
                    }
                    </Link>
                </Button>
                <span className="text-3xl font-bold text-muted-foreground"><span className="text-accent-foreground capitalize">{currentMonth}</span> {year}</span>
                <Button variant='outline'><Link href={linkByMode}>Сегодня</Link></Button>
            </div>
            <div className="w-fit h-fit flex items-center gap-3">
                <ProjectsGrid />
                <User />
            </div>
        </header>
    )
}

export default Header