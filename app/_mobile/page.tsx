import { Button } from "@/components/ui/button"
// import { generateMonthCalendar } from "@/helpers/calendar-generators"
import { DateTime } from "luxon"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import Calendar from "../_components/mobile/calendar"
import { Separator } from "@/components/ui/separator"
import Redline from "@/components/shared/redline"

const page = () => {
  const nowDate = DateTime.now().setLocale('ru')
  // const events = visitorId ? await calendar.events.get(visitorId) : []
  // const days = generateMonthCalendar(nowDate, [])
  const scratch = Array.from({ length: 24 }).map((_, i) => i)
  const lines = Array.from({ length: 5 }).map((_, i) => i)
  const actualDate = DateTime.now().toFormat('dd-MM-yyyy')
  const nowKey = nowDate.toFormat('dd-MM-yyyy')
  const isMatchWithRealDate = actualDate === nowKey
  return (
    <div className="w-full">
      <div className="w-full h-16 shrink-0 border-b flex items-center justify-between px-6 bg-card">
        <Button size='icon' variant='ghost'><BiChevronLeft size={18} /></Button>
        <span className="text-lg font-semibold text-center capitalize">{ nowDate.monthLong }</span>
        <Button size='icon' variant='ghost'><BiChevronRight size={18} /></Button>
      </div>
      <Calendar />
      <div className="w-full relative h-fit">
      { isMatchWithRealDate && <Redline /> }
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
    </div>
  )
}

export default page