'use client'

import { useInterval } from "ahooks"
import { DateTime } from "luxon"
import { ElementRef, useEffect, useRef, useState } from "react"
import { Separator } from "../ui/separator"

type Props = {
  duration_hour?: number
  start_hour?: number
  end_hour?: number
  start_minute?: number
  end_minute?: number
  hideTime?: boolean
}
const Redline = ({ hideTime=false, duration_hour=24, start_hour=0, start_minute=0, end_hour=23, end_minute=59 }: Props) => {
  const [date, setDate] = useState<DateTime>(DateTime.now())
  const [width, setWidth] = useState<number>(0)
  const ref = useRef<ElementRef<'hr'>>(null)
  const default_duration = duration_hour
  // const secondWidth = width / (default_duration * 60**2)
  // const minuteWidth = width / (default_duration * 60)
  // const hourWidth = width / default_duration
  // const left = (date.hour * hourWidth) + (date.minute * minuteWidth) + (date.second * secondWidth)
  const currentInMinutes = date.hour * 60 + date.minute
  const startInMinutes = start_hour * 60 + start_minute
  const endInMinutes = end_hour * 60 + end_minute
  const a = startInMinutes
  const b = endInMinutes
  const c = currentInMinutes
  const percent = 100 * ((a - c) / (a - b))
  /*
    (x / (x/100)) * 100
    start - 00:00 -> 0%
    current - 10:41 -> ???%
    end - 23:59 -> 100%
  */
  useEffect(() => {
    const hr = ref.current
    if (hr) {
      const parent = hr.parentElement
      // console.log(hr, parent)
      if (parent) {
        const parentWidth = parent.clientWidth
        setWidth(parentWidth)
      }
    }
  },[ref])
  useInterval(() => {
    setDate(DateTime.now())
  },1000)
  return (
    <div ref={ref} style={{ left: `${percent}%` }}
    className="w-fit transition-transform h-full flex flex-col justify-center items-center absolute z-20">
      {
        !hideTime &&
        <span className="absolute -top-8 z-20 text-destructive-foreground text-xs">
          {date.hour > 9 ? date.hour : `0${date.hour}`}:{date.minute > 9 ? date.minute : `0${date.minute}`}
        </span>
      }
      <Separator orientation="vertical" className="bg-destructive absolute left-0" />
    </div>
  )
}

export default Redline