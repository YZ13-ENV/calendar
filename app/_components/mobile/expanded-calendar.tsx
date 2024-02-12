import MonthDayNames from "@/components/shared/month-day-names"
import { generateMonthCalendar } from "@/helpers/calendar-generators"
import { DateTime } from "luxon"


const ExpandedCalendar = () => {
  const nowDate = DateTime.now().setLocale('ru')
  // const events = visitorId ? await calendar.events.get(visitorId) : []
  const days = generateMonthCalendar(nowDate, [])
  return (
    <>
    <div className="w-full px-3 pt-2">
      <MonthDayNames short noBorder size="sm" centered />
    </div>
    <div className="w-full h-96 border-b grid grid-cols-7 px-3 pb-3 grid-rows-6">
      {
        days.map(day => {
          return <div key={day.key} className="w-full h-full flex items-center justify-center">
            {day.date.day}
          </div>
        })
      }
    </div>
    </>
  )
}

export default ExpandedCalendar