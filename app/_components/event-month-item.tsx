"use client"

import { useAppSelector } from "@/components/entities/store/store"
import { cn } from "@/lib/utils"
import { DocEvent } from "@/types/calendar"
import { DateTime } from "luxon"
import Link from "next/link"

type Props = {
  index: number
  event: DocEvent
}
const EventMonthItem = ({ event, index }: Props) => {
  const date = useAppSelector(state => state.globalDate.date)
  const inSeconds = date.toSeconds()
  const isLast = index === 3
  const isFirst = index === 0
  const dynamicClassName = `${isLast ? 'border-0' : isFirst ? '' : ''}`
  const start = DateTime.fromSeconds(event.date.start)
  const end = DateTime.fromSeconds(event.date.end)
  const isEnded = inSeconds >= event.date.end
  return (
    <Link href={`/event/${event.doc_id}`}
    className={cn(
      isEnded ? 'border-b text-muted-foreground' : '',
      dynamicClassName,
      `w-full h-1/4 transition-colors hover:bg-muted flex items-center justify-between px-3`
    )}>
      <span className={cn(
        isEnded ? "line-through" : "",
        "line-clamp-1 text-xs text-muted-foreground"
      )}>{event.name}</span>
      <span className="text-xs text-muted-foreground shrink-0">
        { start.hour > 9 ? start.hour : `0${start.hour}` }
        :
        { start.minute > 9 ? start.minute : `0${start.minute}` }
        -
        { end.hour > 9 ? end.hour : `0${end.hour}` }
        :
        { end.minute > 9 ? end.minute : `0${end.minute}` }
      </span>
    </Link>
  )
}

export default EventMonthItem