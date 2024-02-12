import { DateTime } from "luxon"

const NotExpandedCalendar = () => {
  const date = DateTime.now().setLocale('ru')
  const weekRange = [ -3, -2, -1, 0, 1, 2, 3 ]
  // const events = visitorId ? await calendar.events.get(visitorId) : []
  // const days = generateMonthCalendar(nowDate, [])
  return (
    <div className="w-full h-fit flex items-center gap-2 justify-between px-6 py-4">
      {
        weekRange.map(range => {
          const day_date = date.plus({ day: range })
          return <div className="w-fit px-2 h-fit flex flex-col gap-2" key={date.toFormat("dd-MM-yyyy")}>
            <span className="text-center text-sm text-muted-foreground">{ day_date.weekdayShort }</span>
            <span className="text-center">{ day_date.day }</span>
          </div>
        })
      }
    </div>
  )
}

export default NotExpandedCalendar