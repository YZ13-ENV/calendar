import { generateMonthCalendar } from "@/helpers/calendar-generators"
import { parseDate } from "@/helpers/day-parser"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  params: {
    date: string
  }
}
const page = ({ params }: Props) => {
  const year_month = Array.from({ length: 12 }).map((_, i) => ++i)
  const dateKey = params.date
  const { actual_date, date } = parseDate(dateKey)
  return (
    <div style={{ height: 'calc(100dvh - 64px)' }} className="grid grid-cols-4 grid-rows-3">
      {
        year_month.map(month => {
          const month_date = date.set({ month: month })
          const month_grid = generateMonthCalendar(month_date)
          const key = month_date.toFormat('dd-MM-yyyy')
          const isMatchActualMonth = actual_date.month === month_date.month
          return (
            <div key={key + '-wrapper'} className="w-full h-full flex flex-col">
              <Link href={`/month/${key}`}
              className="w-full h-9 flex items-center justify-center hover:bg-card transition-colors">
                <span className={`text-sm ${isMatchActualMonth ? 'text-accent-foreground' : 'text-muted-foreground'} text-center capitalize mx-auto`}>
                  { month_date.monthLong }
                </span>
              </Link>
              <div style={{ height: 'calc(100% - 36px)' }} className="w-full h-full month-wrapper">
                {
                  month_grid.map(
                    item => {
                      const isMatchItemMonth = actual_date.month === item.date.month
                      const day_key = item.date.toFormat('dd-MM-yyyy')
                      return (
                        <Link key={key} href={`/day/${day_key}`}
                        className={cn(
                          isMatchItemMonth ? 'text-accent-foreground' : 'text-muted-foreground',
                          "w-full h-full flex text-sm items-center justify-center hover:bg-card transition-colors"
                        )}>
                          { item.date.day }
                        </Link>
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