import { DateTime } from "luxon"

type Props = {
  params: {
    date: string
  }
}
const page = ({ params }: Props) => {
  const weekRange = [ -3, -2, -1, 0, 1, 2, 3 ]
  const todayDate = params.date
  const nowDate = todayDate
  ? DateTime.fromFormat(todayDate, 'dd-MM-yyyy').setLocale('ru')
  : DateTime.now().setLocale('ru')
  // const actualDate = DateTime.now().toFormat('dd-MM-yyyy')
  return (
    <div style={{ height: 'calc(100dvh - 64px)' }} className="w-full flex items-start">
      {
        weekRange.map(col => {
          const day_date = nowDate.plus({ day: col })
          return (
            <div key={col + 'col-range'} className="h-full border-r flex flex-col"
            style={{ width: 'calc(100% / 7)' }}>
              <div className="w-full py-2 flex flex-col gap-2 items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground">{day_date.day}</span>
                <span className="text-center text-sm text-muted-foreground capitalize">
                  {day_date.weekdayLong}
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default page