'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import Link from "next/link"
import { ProjectsGrid } from "ui"
import User from "../shared/user-circle"
import { DateTime } from "luxon"
import NewEventDrawer from "@/app/_components/new-event-drawer"
import ViewSelect from "./view-select"
import { useEffect, useState } from "react"

type ViewMode = 'day' | 'week' | 'month' | 'year'
const views = ['day', 'week', 'month', 'year']
type Props = {
    providedDate?: string
}
const Header = ({ providedDate }: Props) => {
    const [mode, setMode] = useState<ViewMode>('month')
    const searchParams = useSearchParams()
    const todayDate = providedDate ? providedDate : searchParams.get('date')
    const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
    const currentMonth = nowDate.monthLong
    const year = nowDate.year
    const actualDate = DateTime.now().setLocale('ru')
    const todayKey = actualDate.toFormat('dd-MM-yyyy')
    const path = usePathname()
    const linkByMode = mode === 'month' ? `/month/${todayKey}` : `/day/${todayKey}`
    const DateView = (props: { mode: ViewMode }): JSX.Element | null => {
        const mode = props.mode
        if (mode === 'day') return (
            <>
                <span className="md:text-3xl text-xl font-bold text-accent-foreground capitalize">{nowDate.day}</span>
                <span className="md:text-3xl text-xl font-bold text-muted-foreground capitalize">{nowDate.toFormat('MMMM')}</span>
            </>
        )
        if (mode === 'week') return (
            <>
                <span className="md:text-3xl text-xl font-bold text-accent-foreground capitalize">{nowDate.weekNumber} Неделя</span>
                <span className="md:text-3xl text-xl font-bold text-muted-foreground">{year}</span>
            </>
        )
        if (mode === 'month') return (
            <>
                <span className="md:text-3xl text-xl font-bold text-accent-foreground capitalize">{currentMonth}</span>
                <span className="md:text-3xl text-xl font-bold text-muted-foreground">{year}</span>
            </>
        )
        if (mode === 'year') return <span className="md:text-3xl text-xl font-bold text-accent-foreground">{year}</span>
        return null
    }
    useEffect(() => {
        views.forEach(view => path.includes(view) ? setMode(view as ViewMode) : null)
    },[path])
    return (
        <header className="w-full h-16 px-3 flex items-center shrink-0 border-b bg-card justify-between">
            <div className="w-fit h-fit flex items-center gap-3">
                <DateView mode={mode} />
                <Button variant='outline'><Link href={linkByMode}>Сегодня</Link></Button>
            </div>
            <div className="w-fit h-fit flex items-center gap-3">
                <ViewSelect />
                <NewEventDrawer />
                <div className="shrink-0"><ProjectsGrid /></div>
                <div className="shrink-0"><User /></div>
            </div>
        </header>
    )
}

export default Header