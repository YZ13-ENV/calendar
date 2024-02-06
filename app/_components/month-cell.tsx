import { CalendarItem } from "@/types/calendar"
import { DateTime } from 'luxon'
import Link from 'next/link'
import { BiRightArrowAlt } from 'react-icons/bi'
import EventMonthItem from "./event-month-item"

type Props = {
  providedDate: string
  day: CalendarItem
  index: number
}
const MonthCell = ({ day, index, providedDate }: Props) => {
  const todayDate = providedDate
  const actualDate = DateTime.now().setLocale('ru')
  const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
  const today = todayDate ? todayDate : nowDate.toFormat('dd-MM-yyyy')
  const key = day.date.toFormat('dd-MM-yyyy')
  const selected = today === key
  const dayNum = day.date.day
  const isToday = day.key === actualDate.toFormat('dd-MM-yyyy')
  const notCurrentMonth = day.date.month !== nowDate.month
  const isLastDay = day.date.daysInMonth === day.date.day
  const isFirstDay = day.date.day === 1
  return (
    <div className={`w-full h-full shrink-0 border-r border-b cursor-pointer ${selected ? 'bg-card' : 'hover:bg-card transition-colors'}`}>
      {/* <Link href={`?date=${key}`} /> */}
      <div className="w-full h-fit pt-2 px-3 shrink-0 flex items-center justify-between">
        <Link href={`/month/${key}`} className='text-xs capitalize text-muted-foreground'>{dayNum}</Link>
        <div className="flex items-center gap-1 w-fit h-fit">
            {
                ((notCurrentMonth && isFirstDay) || (isLastDay && notCurrentMonth)) &&
                <span className="capitalize text-xs text-muted-foreground">
                  { day.date.setLocale('ru').monthLong }
                </span>
            }
            <Link href={`/day/${key}`} className="capitalize text-xs text-muted-foreground inline-flex items-center gap-2">
              { isToday && <span>Сегодня</span> }
              <BiRightArrowAlt size={16} />
            </Link>
        </div>
      </div>
      <div style={{ height: 'calc(100% - 24px)' }} className="w-full h-full px-3 py-2 flex flex-col">
        {
          day.items
          .sort((a, b) => a.date.start - b.date.start)
          .filter((_, i) => i <= 3)
          .map((event, i) => <EventMonthItem event={event} index={i} key={event.doc_id} />)
        }
      </div>
    </div>
  )
}

export default MonthCell