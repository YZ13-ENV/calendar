import { Separator } from "@/components/ui/separator"
import { DateTime } from "luxon"
import { redirect } from "next/navigation"
import Header from "@/components/widgets/header"
import Redline from "@/components/shared/redline"
import { cookies } from "next/headers"
import { calendar } from "@/api/calendar"
import DayCell from "@/app/_components/day-cell"

type Props = {
  params: {
    date: string
  }
}
const page = async({ params }: Props) => {
  const actualDate = DateTime.now().toFormat('dd-MM-yyyy')
  const todayDate = params.date
  const nowDate = todayDate
  ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru')
  : DateTime.now().setLocale('ru')
  const dayKey = nowDate.toFormat('dd-MM-yyyy')
  const scratch = Array.from({ length: 24 }).map((_, i) => i)
  const lines = Array.from({ length: 5 }).map((_, i) => i)
  const cookieList = cookies()
  const uidCookie = cookieList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const events = (visitorId ? await calendar.events.get(visitorId) : [])
  .filter(event => event.key === todayDate)
  const isMatchWithRealDate = actualDate === todayDate
  if (!todayDate) redirect(`/day/${dayKey}`)
  return (
    <div style={{ minHeight: 'calc(100dvh - 64px)' }}
    className="relative w-full min-h-full h-fit shrink-0 flex flex-col">
      { isMatchWithRealDate && <Redline /> }
      {
        events.map(event => <DayCell key={event.doc_id} event={event} />)
      }
      {
        scratch.map(item =>
        <>
          <div className="w-full relative h-64 p-6 hover:bg-card transition-colors cursor-pointer">
            <span className="relative -top-3 text-muted-foreground text-sm">{item > 9 ? item : `0${item}`}:00</span>
            { lines.map(line => <Separator key={line + '-line-bg'} style={{ top: `${(line * 256) / lines.length - 1}px` }} className="absolute left-0 opacity-50" />) }
          </div>
          <Separator />
        </>
        )
      }
    </div>
  )
}

export default page