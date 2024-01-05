import Header from "@/components/widgets/header";
import { generateMonthCalendar } from "@/helpers/calendar-generators";
import { DateTime } from "luxon";

export default function Home() {
    const days = generateMonthCalendar(DateTime.now())
    return (
        <>
          <Header />
          <div style={{ height: 'calc(100vh - 64px)' }} className="w-full h-full shrink-0 grid grid-cols-7 grid-rows-6 overflow-hidden">
            {
              days.map(day => <div key={day.date.toString()} className="w-full h-full shrink-0 border-r border-b" />)
            }
          </div>
        </>
    )
}
