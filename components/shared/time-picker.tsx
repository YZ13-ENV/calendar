'use client'
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { useEffect, useState } from "react"

type TimePickerValue = `${number}`
export type TimePickerAnswer = `${number}:${number}`

type Props = {
  onTimeChange?: (time: TimePickerAnswer) => void
  hourStartAt?: number
  minuteStartAt?: number
} & React.HTMLAttributes<HTMLDivElement>
const TimePicker = ({ hourStartAt, minuteStartAt, onTimeChange, ...props }: Props) => {
  const formattedHourStartAt = `${hourStartAt}` as TimePickerValue | undefined
  const formattedMinuteStartAt = `${minuteStartAt}` as TimePickerValue | undefined
  const [selectedHour, setSelectedHour] = useState<TimePickerValue>(
    hourStartAt && formattedHourStartAt ? formattedHourStartAt : '0'
  )
  const [selectedMinute, setSelectedMinute] = useState<TimePickerValue>(
    minuteStartAt && formattedMinuteStartAt ? formattedMinuteStartAt : '0'
  )
  const hoursRange = Array.from({ length: 24 }).map((_, i) => i).filter(item => hourStartAt
    ? item >= hourStartAt
    : item > -1
  )
  const minutesRange = Array.from({ length: 60 }).map((_, i) => i).filter(item =>
    formattedHourStartAt === selectedHour && minuteStartAt
    ? item > minuteStartAt
    : item > -1
  )
  useEffect(() => {
    if (onTimeChange) onTimeChange(`${selectedHour}:${selectedMinute}`)
  },[onTimeChange, selectedHour, selectedMinute])
  useEffect(() => {
    if (formattedHourStartAt && hourStartAt) {
      const isAboveRange = hourStartAt > parseInt(selectedHour)
      if (isAboveRange) setSelectedHour(formattedHourStartAt)
    }
    if (minuteStartAt && formattedMinuteStartAt) {
      const isMinuteAboveRange = (formattedHourStartAt === selectedHour) && (minuteStartAt >= parseInt(selectedMinute))
      if (isMinuteAboveRange) {
        const isLimit = minuteStartAt === 59
        setSelectedMinute(isLimit ? `${59}` : `${minuteStartAt + 1}`)
      }
    }
  },[hourStartAt, minuteStartAt])
  return (
    <div {...props} className={cn(
      "relative flex justify-center gap-2 overflow-hidden items-center h-9 w-full rounded-md bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      props.className
    )}>
      <div className="w-fit h-full flex flex-col items-center justify-center">
        <Select value={selectedHour} onValueChange={value => setSelectedHour(value as TimePickerValue)}>
          <SelectTrigger className="w-fit">
            { selectedHour }
          </SelectTrigger>
          <SelectContent>
            {
              hoursRange.map(
                hour => <SelectItem key={'hour-item-' + hour} value={String(hour)}>{hour}</SelectItem>
              )
            }
          </SelectContent>
        </Select>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="w-fit h-full flex flex-col items-center justify-center">
        <Select value={selectedMinute} onValueChange={value => setSelectedMinute(value as TimePickerValue)}>
          <SelectTrigger className="w-full">
            { selectedMinute }
          </SelectTrigger>
          <SelectContent>
            {
              minutesRange.map(
                minute => <SelectItem key={'minute-item-' + minute} value={String(minute)}>{minute}</SelectItem>
              )
            }
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TimePicker