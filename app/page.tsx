import Header from "@/components/widgets/header";
import { generateMonthCalendar } from "@/helpers/calendar-generators";
import { DateTime } from "luxon";

export default function Home() {
    const nowDate = DateTime.now()
    const days = generateMonthCalendar(nowDate)
    return (
        <>
          <Header />
          <div style={{ height: 'calc(100vh - 64px)' }} className="w-full h-full shrink-0 grid grid-cols-7 grid-rows-6 overflow-hidden">
            {
              days.map((day, index) => {
                const dayNum = day.date.day
                const isToday = day.key === nowDate.toFormat('yyyy-MM-dd')
                const notCurrentMonth = day.date.month !== nowDate.month
                const isLastDay = day.date.daysInMonth === day.date.day
                const isFirstDay = day.date.day === 1
                return (
                  <div key={day.date.toString()} className="w-full h-full shrink-0 border-r border-b">
                    <div className="w-full h-fit pt-2 px-2 flex items-center justify-between">
                      <span className='text-xs capitalize text-muted-foreground'>{dayNum}</span>
                      <div className="flex items-center gap-1 w-fit h-fit">
                          <span className='text-xs capitalize text-muted-foreground'>
                          {
                              isToday 
                              ? 'Сегодня' 
                              : ((notCurrentMonth && isFirstDay) || (isLastDay && notCurrentMonth)) && <span className="capitalize">{ day.date.setLocale('ru').monthLong }</span>
                          }
                          </span>
                          {
                              (index >= 0 && index <= 6) && <span className='text-xs capitalize text-muted-foreground'>{ day.date.setLocale('ru').weekdayShort }</span>
                          }
                      </div>
                    </div>
                  </div>
                  )
                }
              )
            }
          </div>
        </>
    )
}
