import { Separator } from "@/components/ui/separator"
import { DateTime } from "luxon"
import { redirect } from "next/navigation"
import Header from "@/components/widgets/header"
import Redline from "@/components/shared/redline"

type Props = {
  params: {
    date: string
  }
}
const page = ({ params }: Props) => {
  const todayDate = params.date
  const nowDate = todayDate ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru') : DateTime.now().setLocale('ru')
  const dayKey = nowDate.toFormat('dd-MM-yyyy')
  const scratch = Array.from({ length: 24 }).map((_, i) => i)
  const lines = Array.from({ length: 5 }).map((_, i) => i)
  if (!todayDate) redirect(`/day/${dayKey}`)
  return (
    <>
      <Header providedDate={dayKey} mode="day" />
      <div style={{ height: 'calc(100% - 64px)' }} className="relative w-full h-full shrink-0 flex flex-col">
        <Redline />
        {
          scratch.map(item =>
          <>
            <div className="w-full relative h-64 p-6">
              <span className="relative -top-3 text-muted-foreground text-sm">{item > 9 ? item : `0${item}`}:00</span>
              { lines.map(line => <Separator key={line + '-line-bg'} style={{ top: `${(line * 256) / lines.length - 1}px` }} className="absolute left-0 opacity-50" />) }
            </div>
            <Separator />
          </>
          )
        }
      </div>
    </>
  )
}

export default page