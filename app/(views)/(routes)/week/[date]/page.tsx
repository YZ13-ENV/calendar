import { calendar } from "@/api/calendar"
import Redline from "@/components/shared/redline"
import { mergeDayEvents } from "@/helpers/calendar-generators"
import { parseDate } from "@/helpers/day-parser"
import { DateTime } from "luxon"
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
      <div className="h-full border-r flex flex-col" style={{ width: 'calc(100% / 8)' }}>
        <div className="w-full h-32" />
        {
          scratch.map(
            hour => <div key={hour + '-item'} className="w-full h-48 p-3 shrink-0 border-t">
              <div className="w-full flex items-center justify-end">
                <span className="text-sm text-muted-foreground">{hour > 9 ? hour : `0${hour}`}:00</span>
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
            <div key={key} className="h-full border-r flex flex-col" style={{ width: 'calc(100% / 8)' }}>
              <div className="w-full h-32 py-2 flex flex-col gap-2 items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground capitalize">
                  {
                    !isMatchWithMonth
                    ? day_date.toFormat('dd MMMM')
                    : isMiddle
                    ? day_date.toFormat('dd MMMM')
                    : day_date.day
                  }
                </span>
                <span className="text-center text-sm text-muted-foreground capitalize">{day_date.weekdayLong}</span>
              </div>
              <div className="w-full h-fit flex flex-col relative">
                { isMatchWithRealDate && <Redline hideTime /> }
                {
                  mergedEvents.items.map(
                    event => {
                      const blockHeight = 192
                      const date = DateTime.fromSeconds(event.date.start)
                      const endDate = DateTime.fromSeconds(event.date.end)
                      const top = date.hour * blockHeight
                      return (
                        <div key={event.doc_id} style={{ top: `${top}px` }} className="absolute p-3 w-full h-48">
                          <div className="w-full h-full rounded-lg bg-card hover:bg-muted transition-colors cursor-pointer p-3 flex flex-col">
                            <span className="text-xs text-muted-foreground">{date.toFormat('HH:mm')}-{endDate.toFormat('HH:mm')}</span>
                            <span className="font-medium text-sm">{event.name}</span>
                            { event.description && <span className="text-xs text-muted-foreground">{event.description}</span> }
                          </div>
                        </div>
                      )
                    }
                  )
                }
                {
                  scratch.map(
                    hour => <div key={hour + '-' + key} className="w-full h-48 hover:bg-card cursor-pointer transition-colors shrink-0 border-t"/>
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