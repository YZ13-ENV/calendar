import { DocEvent } from "@/types/calendar"
import { DateTime } from "luxon"
import Link from "next/link"
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button } from "@/components/ui/button"
import { BiRightArrowAlt } from "react-icons/bi"
type Props = {
  event: DocEvent
}
const WeekCell = ({ event }: Props) => {
  const blockHeight = 192
  const blockHeightForMinutes = 192 / 60
  const date = DateTime.fromSeconds(event.date.start)
  const endDate = DateTime.fromSeconds(event.date.end)
  const top = (date.hour * blockHeight) + (date.minute * blockHeightForMinutes)
  const height = (endDate.hour - date.hour) * blockHeight + (endDate.minute - date.minute) * blockHeightForMinutes
  return (
    <div key={event.doc_id} style={{ top: `${top}px`, height: `${height}px` }} className="absolute p-3 w-full h-48 group">
      <div className="w-full h-full rounded-lg bg-card transition-colors cursor-pointer p-3 flex flex-col border group-hover:border-primary">
        <span className="text-xs text-muted-foreground">{date.toFormat('HH:mm')}-{endDate.toFormat('HH:mm')}</span>
        <span className="font-medium text-sm">{event.name}</span>
        <div className="w-full h-fit mt-4">
          <Button variant='outline' size='sm' asChild className="rounded-full gap-2 w-fit">
            <Link href={`/event/${event.doc_id}`}>
              Открыть
              <BiRightArrowAlt size={16} />
            </Link>
          </Button>
          {
            event.description &&
            <div className="md-layout mt-6 text-xs text-muted-foreground p-4 rounded-md bg-muted">
              <MDXRemote source={event.description || ''} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default WeekCell