'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { DateTime } from "luxon"
import NewEventDrawer from "@/app/_components/new-event-drawer"
import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import ViewSelect from "../view-select"
import { Button } from "@/components/ui/button"
import DateView, { ViewMode } from "./date-view"
import { BiRefresh } from "react-icons/bi"
import { useMediaQuery } from "react-responsive"
const UserSection = dynamic(() => import("./user-section"), {
    ssr: false,
    loading: () => <div className="w-fit h-fit flex items-center gap-3">
        <div className="w-9 aspect-square shrink-0 bg-muted animate-pulse rounded-full" />
        <div className="w-9 aspect-square shrink-0 bg-muted animate-pulse rounded-full" />
        <div className="w-9 aspect-square shrink-0 bg-muted animate-pulse rounded-full" />
    </div>
})

const views = ['day', 'week', 'month', 'year']
const Header = () => {
    const [mode, setMode] = useState<ViewMode>('month')
    const path = usePathname()
    const extractedDateKey = useMemo(() => { return path.replace(`/${mode}/`, '') },[path, mode])
    const todayDate = extractedDateKey
    const nowDate = todayDate
    ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru')
    : DateTime.now().setLocale('ru')
    const actualDate = DateTime.now().setLocale('ru')
    const todayKey = actualDate.toFormat('dd-MM-yyyy')
    const linkByMode = mode === 'month' ? `/month/${todayKey}` : `/day/${todayKey}`
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    useEffect(() => {
        views.forEach(view => path.includes(view) ? setMode(view as ViewMode) : null)
    },[path])
    return (
        <header className="w-full h-16 px-3 flex items-center shrink-0 border-b bg-card justify-between">
            <div className="w-fit h-fit flex items-center gap-3">
                <div className="flex lg:flex-row flex-col gap-0 lg:gap-2">
                    <DateView mode={mode} date={nowDate} />
                </div>
                <Button variant='outline' asChild size={isMobile ? 'icon' : 'default'}>
                    <Link href={linkByMode} className="gap-2">
                        <BiRefresh size={18} />
                        <span className="hidden lg:inline">Сегодня</span>
                    </Link>
                </Button>
            </div>
            <div className="w-fit h-fit flex items-center gap-3">
                <div className="flex items-center">
                    <ViewSelect />
                    <NewEventDrawer />
                </div>
                <UserSection />
            </div>
        </header>
    )
}

export default Header