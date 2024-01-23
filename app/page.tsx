import MonthDayNames from "@/components/shared/month-day-names";
import Header from "@/components/widgets/header";
import { generateMonthCalendar } from "@/helpers/calendar-generators";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
import { calendar } from "@/api/calendar";
import MonthCell from "./_components/month-cell";

type Props = {
  searchParams: {
    date?: string
    side?: boolean
  }
}
export default async function Home({ searchParams }: Props) {
    const cookieList = cookies()
    const uidCookie = cookieList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const todayDate = searchParams.date
    const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
    const events = visitorId ? await calendar.events.get(visitorId) : []
    const days = generateMonthCalendar(nowDate, events)
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
              <div style={{ height: 'calc(100% - 64px - 33px)' }} className="month-wrapper">
                { days.map((day, index) => <MonthCell providedDate={todayDate} key={day.date.toString()} day={day} index={index} /> ) }
              </div>
            </div>
          </section>

        </>
    )
}
