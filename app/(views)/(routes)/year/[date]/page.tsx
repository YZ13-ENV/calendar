import { DateTime } from "luxon"

type Props = {
  params: {
    date: string
  }
}
const page = ({ params }: Props) => {
  const year_month = Array.from({ length: 12 }).map((_, i) => ++i)
  const todayDate = params.date
  const nowDate = todayDate
  ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru')
  : DateTime.now().setLocale('ru')
  return (
    <div style={{ height: 'calc(100dvh - 64px)' }} className="grid grid-cols-4 grid-rows-3">
      {
        year_month.map(month => <div key={month + "year-month-unit"}
        className="border-r border-b w-full h-full flex items-center justify-center">
          { month }
        </div>)
      }
    </div>
  )
}

export default page