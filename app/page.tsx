import User from "@/components/shared/user-circle";
import { Button } from "@/components/ui/button";
import { generateMonthCalendar } from "@/helpers/calendar-generators";
import { DateTime } from "luxon";
import Link from "next/link";
import { BiChevronDown, BiChevronUp, BiMenu, BiX } from 'react-icons/bi'
import { ProjectsGrid } from "ui";

type Props = {
  searchParams: {
    side?: boolean
  }
}
export default function Home({ searchParams }: Props) {
    const nowDate = DateTime.now().setLocale('ru')
    const days = generateMonthCalendar(nowDate)
    const currentMonth = nowDate.monthLong
    const year = nowDate.year
    const enableSideMenu = searchParams.side || false
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
              <div className="w-full h-16 px-3 flex items-center shrink-0 border-b border-x bg-card justify-between">
                <div className="w-fit h-fit flex items-center gap-3">
                  <Button size='icon' variant='ghost'>
                    <Link href={enableSideMenu ? '/' : '?side=true'}>
                      {
                        enableSideMenu
                        ? <BiX size={24} />
                        : <BiMenu size={24} />
                      }
                    </Link>
                  </Button>
                  <span className="text-3xl font-bold text-muted-foreground"><span className="text-accent-foreground capitalize">{currentMonth}</span> {year}</span>
                </div>
                <div className="w-fit h-fit flex items-center gap-3">
                  <ProjectsGrid />
                  <User />
                </div>
              </div>
              <div className="w-full h-10 shrink-0 grid grid-cols-7 grid-rows-1 border-b border-x bg-card">
                <div className="w-full h-full py-2 px-3">
                  <span className="text-sm text-muted-foreground">Понедельник</span>
                </div>
                <div className="w-full h-full py-2 px-3">
                  <span className="text-sm text-muted-foreground">Вторник</span>
                </div>
                <div className="w-full h-full py-2 px-3">
                  <span className="text-sm text-muted-foreground">Среда</span>
                </div>
                <div className="w-full h-full py-2 px-3">
                  <span className="text-sm text-muted-foreground">Четверг</span>
                </div>
                <div className="w-full h-full py-2 px-3">
                  <span className="text-sm text-muted-foreground">Пятница</span>
                </div>
                <div className="w-full h-full py-2 px-3">
                  <span className="text-sm text-muted-foreground">Суббота</span>
                </div>
                <div className="w-full h-full py-2 px-2">
                  <span className="text-sm text-muted-foreground">Воскресенье</span>
                </div>
              </div>
              <div style={{ height: 'calc(100% - 64px - 40px)' }} className="w-full h-full shrink-0 grid grid-cols-7 grid-rows-6 border-l overflow-hidden">
                {
                  days.map((day, index) => {
                    const dayNum = day.date.day
                    const isToday = day.key === nowDate.toFormat('yyyy-MM-dd')
                    const notCurrentMonth = day.date.month !== nowDate.month
                    const isLastDay = day.date.daysInMonth === day.date.day
                    const isFirstDay = day.date.day === 1
                    return (
                      <div key={day.date.toString()} className="w-full h-full shrink-0 border-r border-b">
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
                          </div>
                        </div>
                      </div>
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
