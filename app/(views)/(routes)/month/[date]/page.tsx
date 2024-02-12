import MonthDayNames from "@/components/shared/month-day-names";
// import Header from "@/components/widgets/header";
import { generateMonthCalendar } from "@/helpers/calendar-generators";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { calendar } from "@/api/calendar";
import MonthCell from "../../../../_components/month-cell";
import { getVisitorId } from "@/helpers/cookies";

type Props = {
  params: {
    date: string
  }
}
export default async function Home({ params }: Props) {
    const visitorId = getVisitorId()
    const todayDate = params.date
    const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
    const events = visitorId ? await calendar.events.get(visitorId) : []
    const days = generateMonthCalendar(nowDate, events)
    const today = todayDate ? todayDate : nowDate.toFormat('dd-MM-yyyy')
    if (!todayDate) redirect(`/month/${today}`)
    return (
      <>
        <MonthDayNames />
        <div style={{ height: 'calc(100dvh - 64px - 33px)' }} className="month-wrapper border-l">
          { days.map(
              (day, index) => <MonthCell providedDate={todayDate} key={day.date.toString()} day={day} index={index} />
            )
          }
        </div>
      </>
    )
}
