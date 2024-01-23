'use client'

import { useInterval } from "ahooks"
import { DateTime } from "luxon"
import { ElementRef, useEffect, useRef, useState } from "react"

const Redline = () => {
  const [date, setDate] = useState<DateTime>(DateTime.now())
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<ElementRef<'hr'>>(null)
  const secondHeight = height / (24 * 60**2)
  const minuteHeight = height / (24 * 60)
  const hourHeight = height / 24
  const top = (date.hour * hourHeight) + (date.minute * minuteHeight) + (date.second * secondHeight)
  useEffect(() => {
    const hr = ref.current
    if (hr) {
      const parent = hr.parentElement
      // console.log(hr, parent)
      if (parent) {
        const parentHeight = parent.clientHeight
        setHeight(parentHeight)
      }
    }
  },[ref])
  useInterval(() => {
    setDate(DateTime.now())
  },1000)
  return (
    <div ref={ref} style={{ top: `${top}px` }}
    className="w-full transition-transform h-fit flex items-center absolute z-20">
      <span className="px-2 relative left-4 py-0.5 rounded-full z-20 bg-destructive text-destructive-foreground text-sm">
        {date.hour > 9 ? date.hour : `0${date.hour}`}:{date.minute > 9 ? date.minute : `0${date.minute}`}
      </span>
      <hr className="border-destructive absolute left-0 w-full" />
    </div>
  )
}

export default Redline