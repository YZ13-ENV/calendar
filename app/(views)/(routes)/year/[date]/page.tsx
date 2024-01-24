import { generateMonthCalendar } from "@/helpers/calendar-generators"
import { parseDate } from "@/helpers/day-parser"
import { DateTime } from "luxon"

type Props = {
  params: {
    date: string
  }
}
const page = ({ params }: Props) => {
  const year_month = Array.from({ length: 12 }).map((_, i) => ++i)
  const dateKey = params.date
  const { actual_date, date, key } = parseDate(dateKey)
  return (
    <div style={{ height: 'calc(100dvh - 64px)' }} className="grid grid-cols-4 grid-rows-3">
      {
        year_month.map(month => {
          const month_date = date.set({ month: month })
          const month_grid = generateMonthCalendar(month_date)
          const key = month_date.toFormat('dd-MM-yyyy')
          const isMatchActualMonth = actual_date.month === month_date.month
          return (
            <div key={key + '-wrapper'} className="border-b border-r w-full h-full flex flex-col">
              <div className="w-full h-9 flex items-center justify-center border-b">
                <span className={`text-sm ${isMatchActualMonth ? 'text-accent-foreground' : 'text-muted-foreground'} text-center capitalize mx-auto`}>
                  {month_date.monthLong}
                </span>
              </div>
              <div style={{ height: 'calc(100% - 36px)' }} className="w-full h-full month-wrapper">
                {
                  month_grid.map(
                    item => {
                      const isMatchItemMonth = item.date.month === month_date.month
                      return (
                        <div key={key} className={`w-full h-full flex text-sm ${isMatchItemMonth ? 'text-accent-foreground' : 'text-muted-foreground'} items-center justify-center`}>
                          {item.date.day}
                        </div>
                      )
                    }
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