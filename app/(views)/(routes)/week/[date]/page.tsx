import { calendar } from "@/api/calendar"
import WeekCell from "@/app/_components/week-cell"
import Redline from "@/components/shared/redline"
import { Separator } from "@/components/ui/separator"
import { mergeDayEvents } from "@/helpers/calendar-generators"
import { parseDate } from "@/helpers/day-parser"
// import { DateTime } from "luxon"
import { cookies } from "next/headers"

type Props = {
  params: {
    date: string
  }
}
const page = async({ params }: Props) => {
  const weekRange = [ -3, -2, -1, 0, 1, 2, 3 ]
  const dateKey = params.date
  const scratch = Array.from({ length: 24 }).map((_, i) => i)
  const cookieList = cookies()
  const uidCookie = cookieList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const { actual_key, date } = parseDate(dateKey)
  const actualKey = actual_key
  const events = visitorId ? await calendar.events.get(visitorId) : []
  return (
    <div style={{ minHeight: 'calc(100dvh - 64px)' }} className="w-full flex items-start h-full">
      <div className="h-full w-16 flex flex-col">
        <div className="w-full h-32 border-r border-b" />
        {
          scratch.map(
            hour => <div key={hour + '-item'}
            className="w-full h-48 p-3 shrink-0 border-r border-b relative">
              <div className="w-full h-full flex items-center justify-center">
                <span className="absolute z-10 inline-flex items-center justify-center w-full bg-background -top-2.5 text-xs select-none text-muted-foreground">{hour > 9 ? hour : `0${hour}`}:00</span>
                <div className="w-full h-full flex flex-col justify-between items-center">
                  <Separator className="w-1/2 opacity-0" />
                  <Separator className="w-2/3" />
                  <Separator className="w-1/2 opacity-50" />
                  <Separator className="w-full" />
                  <Separator className="w-1/2 opacity-50" />
                  <Separator className="w-2/3" />
                  <Separator className="w-1/2 opacity-0" />
                </div>
              </div>
            </div>
          )
        }
      </div>
      {
        weekRange.map(col => {
          const day_date = date.plus({ day: col })
          const key = day_date.toFormat('dd-MM-yyyy')
          const mergedEvents = mergeDayEvents({ date: day_date, key: key, items: [] }, events)
          const isMatchWithRealDate = actualKey === key
          const isMatchWithMonth = day_date.month === date.month
          const isMiddle = col === 0
          return (
            <div key={key} className="h-full flex flex-col" style={{ width: 'calc(100% / 7)' }}>
              <div className="sticky top-0 bg-background border-b z-10 border-r w-full h-32 p-2 flex flex-col gap-2 items-center justify-center">
                <span className="text-wrap lg:text-2xl text-lg text-center font-bold text-accent-foreground capitalize">
                  {
                    !isMatchWithMonth
                    ? day_date.toFormat('dd MMMM')
                    : isMiddle
                    ? day_date.toFormat('dd MMMM')
                    : day_date.day
                  }
                </span>
                <span className="text-center lg:text-sm text-xs text-muted-foreground capitalize">{day_date.weekdayLong}</span>
              </div>
              <div className="w-full h-fit flex flex-col relative">
                { isMatchWithRealDate && <Redline hideTime /> }
                {
                  mergedEvents.items.map(
                    event => <WeekCell key={event.doc_id} event={event} />
                  )
                }
                {
                  scratch.map(
                    hour => <div key={hour + '-' + key} className="w-full h-48 border-r border-b hover:bg-card cursor-pointer transition-colors shrink-0 border-0"/>
                  )
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default page