import { CalendarItem } from "@/types/calendar"
import { DateTime } from 'luxon'
import Link from 'next/link'
import { BiRightArrowAlt } from 'react-icons/bi'

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
        <Link href={`?date=${key}`} className='text-xs capitalize text-muted-foreground'>{dayNum}</Link>
        <div className="flex items-center gap-1 w-fit h-fit">
            <span className='text-xs capitalize text-muted-foreground'>
            {
                isToday
                ? 'Сегодня'
                : ((notCurrentMonth && isFirstDay) || (isLastDay && notCurrentMonth)) && <span className="capitalize">{ day.date.setLocale('ru').monthLong }</span>
            }
            </span>
            <Link href={`/day/${key}`} className="text-muted-foreground"><BiRightArrowAlt /></Link>
        </div>
      </div>
      <div style={{ height: 'calc(100% - 24px)' }} className="w-full h-full px-3 py-2 flex flex-col">
        {
          day.items
          .sort((a, b) => a.date.start - b.date.start)
          .filter((_, i) => i <= 3)
          .map((item, i) => {
            const isLast = i === 3
            const isFirst = i === 0
            const dynamicClassName = `${isLast ? 'rounded-b-md' : isFirst ? 'rounded-t-md border-b' : 'rounded-none border-b'}`
            const start = DateTime.fromSeconds(item.date.start)
            const end = DateTime.fromSeconds(item.date.end)
            return (
              <div key={item.doc_id}
              className={`w-full h-1/4 ${dynamicClassName} transition-colors hover:bg-muted flex items-center justify-between px-1.5`}>
                <span className="line-clamp-1 text-xs text-muted-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  { start.hour > 9 ? start.hour : `0${start.hour}` }
                  :
                  { start.minute > 9 ? start.minute : `0${start.minute}` }
                  -
                  { end.hour > 9 ? end.hour : `0${end.hour}` }
                  :
                  { end.minute > 9 ? end.minute : `0${end.minute}` }
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MonthCell