import { DateTime } from "luxon"

export type ViewMode = 'day' | 'week' | 'month' | 'year'
type Props = {
  mode: ViewMode
  date: DateTime
}
const DateView = ({ mode, date }: Props) => {
  if (mode === 'day') return (
      <>
          <span className="lg:text-3xl text-lg font-bold text-accent-foreground capitalize">{date.day}</span>
          <span className="lg:text-3xl text-lg font-bold text-muted-foreground capitalize">{date.toFormat('MMMM')}</span>
      </>
  )
  if (mode === 'week') return (
      <>
          <span className="lg:text-3xl text-lg font-bold text-accent-foreground capitalize">{date.weekNumber} Неделя</span>
          <span className="lg:text-3xl text-lg font-bold text-muted-foreground">{date.year}</span>
      </>
  )
  if (mode === 'month') return (
      <>
          <span className="lg:text-3xl text-lg font-bold text-accent-foreground capitalize">{date.monthLong}</span>
          <span className="lg:text-3xl text-lg font-bold text-muted-foreground">{date.year}</span>
      </>
  )
  if (mode === 'year') return <span className="md:text-3xl text-xl font-bold text-accent-foreground">{date.year}</span>
  return null
}

export default DateView