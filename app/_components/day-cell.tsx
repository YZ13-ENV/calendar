'use client'
import { DocEvent } from "@/types/calendar"
import { DateTime } from "luxon"
import Link from "next/link"
import { ElementRef, useEffect, useRef, useState } from "react"

type Props = {
  event: DocEvent
}
const DayCell = ({ event }: Props) => {
  const date = DateTime.fromSeconds(event.date.start)
  const endDate = DateTime.fromSeconds(event.date.end)
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<ElementRef<'div'>>(null)
  const secondHeight = height / (24 * 60**2)
  const minuteHeight = height / (24 * 60)
  const hourHeight = height / 24
  const hourBlockHeight = 256
  const minutesBlockHeight = 256 / 60
  const secondsBlockHeight = 256 / (60 * 2)
  const top = (date.hour * hourHeight) + (date.minute * minuteHeight) + (date.second * secondHeight)
  const eventHeight = (endDate.hour - date.hour) * hourBlockHeight + (endDate.minute - date.minute) * minutesBlockHeight + (endDate.second - date.second) * secondsBlockHeight
  useEffect(() => {
    const div = ref.current
    if (div) {
      const parent = div.parentElement
      console.log(div, parent)
      if (parent) {
        const parentHeight = parent.clientHeight
        setHeight(parentHeight)
      }
    }
  },[ref])
  return (
    <div ref={ref} style={{ top: `${top}px`, height: `${eventHeight}px` }}
    className="absolute w-full px-20 z-10 h-fit">
      {/* <Link href={`/event/${event.doc_id}`} className="absolute w-full h-full" /> */}
      <div className="w-full h-full rounded-lg transition-colors hover:bg-muted cursor-pointer border bg-card p-3">
        <div className="w-fit h-fit flex items-center gap-2">
          <span className="text-sm">{date.toFormat('HH:mm')}-{endDate.toFormat('HH:mm')}</span>
          <span className="text-sm text-muted-foreground">-</span>
          <span className="text-sm">{ event.name }</span>
        </div>
        <span className="text-xs text-muted-foreground">{event.description}</span>
      </div>
    </div>
  )
}

export default DayCell