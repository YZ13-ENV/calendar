import MonthDayNames from "@/components/shared/month-day-names";
import Header from "@/components/widgets/header";
import { generateMonthCalendar } from "@/helpers/calendar-generators";
import { DateTime } from "luxon";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiRightArrowAlt } from 'react-icons/bi'

type Props = {
  searchParams: {
    date?: string
    side?: boolean
  }
}
export default function Home({ searchParams }: Props) {
    const todayDate = searchParams.date
    const actualDate = DateTime.now().setLocale('ru')
    const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
    const days = generateMonthCalendar(nowDate)
    const today = todayDate ? todayDate : nowDate.toFormat('dd-MM-yyyy')
    const enableSideMenu = searchParams.side || false
    if (!todayDate) redirect(`/?date=${today}${enableSideMenu ? `&side=${enableSideMenu}` : ''}`)
    return (
        <>
          {/* <Header /> */}
          <section className="w-full max-w-screen flex items-start flex-row h-screen">
            {
              enableSideMenu &&
              <div className="w-80 shrink-0 h-full bg-card">
                <div className="w-full h-16 px-3 flex items-center shrink-0 gap-3">
                  <div className="w-9 aspect-square rounded-lg bg-muted" />
                  <h1 className='text-3xl font-bold'>Dealer</h1>
                </div>
              </div>
            }
            <div style={{ width: enableSideMenu ? 'calc(100% - 20rem)' : '' }} className="w-full h-full">
              <Header />
              <MonthDayNames />
              <div style={{ height: 'calc(100% - 64px - 40px)' }} className="w-full h-full shrink-0 grid grid-cols-7 grid-rows-6 border-l overflow-hidden">
                {
                  days.map((day, index) => {
                    const key = day.date.toFormat('dd-MM-yyyy')
                    const selected = today === key
                    const dayNum = day.date.day
                    const isToday = day.key === actualDate.toFormat('yyyy-MM-dd')
                    const notCurrentMonth = day.date.month !== nowDate.month
                    const isLastDay = day.date.daysInMonth === day.date.day
                    const isFirstDay = day.date.day === 1
                    return (
                      <Link href={`?date=${key}`} key={day.date.toString()}
                      className={`w-full h-full shrink-0 border-r border-b cursor-pointer ${selected ? 'bg-card' : 'hover:bg-card transition-colors'}`}>
                        <div className="w-full h-fit pt-2 px-3 flex items-center justify-between">
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
                              <Link href={`/day/${key}`} className="text-muted-foreground"><BiRightArrowAlt /></Link>
                          </div>
                        </div>
                      </Link>
                      )
                    }
                  )
                }
              </div>
            </div>
          </section>

        </>
    )
}
