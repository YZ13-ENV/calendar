import { DocEvent } from "@/types/calendar"
import { DateTime } from "luxon"
import Link from "next/link"

type Props = {
  event: DocEvent
}
const WeekCell = ({ event }: Props) => {
  const blockHeight = 192
  const date = DateTime.fromSeconds(event.date.start)
  const endDate = DateTime.fromSeconds(event.date.end)
  const top = date.hour * blockHeight
  const height = (endDate.hour - date.hour) * blockHeight
  return (
    <div key={event.doc_id} style={{ top: `${top}px`, height: `${height}px` }} className="absolute p-3 w-full group h-48">
      <Link href={`/event/${event.doc_id}`} className="w-full h-full absolute" />
      <div className="w-full h-full rounded-lg bg-card group-hover:bg-muted transition-colors cursor-pointer p-3 flex flex-col">
        <span className="text-xs text-muted-foreground">{date.toFormat('HH:mm')}-{endDate.toFormat('HH:mm')}</span>
        <span className="font-medium text-sm">{event.name}</span>
        { event.description && <span className="line-clamp-5 text-xs text-muted-foreground">{event.description}</span> }
      </div>
    </div>
  )
}

export default WeekCell