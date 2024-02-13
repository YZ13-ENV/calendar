'use client'
import { useAppSelector } from "@/components/entities/store/store"
const Redline = dynamic(() => import("@/components/shared/redline-horizontal"), {
  ssr: false
})
import { Separator } from "@/components/ui/separator"
import { DocEvent } from "@/types/calendar"
import { DateTime } from "luxon"
import dynamic from "next/dynamic"
import LiveMarking from "./live-marking"

type Props = {
  date: DocEvent['date']
}
const LiveIndicator = ({ date }: Props) => {
  const { fromSeconds } = DateTime
  const start = fromSeconds(date.start)
  const end = fromSeconds(date.end)
  const real_date = useAppSelector(state => state.globalDate.date)
  const real_date_in_seconds = real_date.toSeconds()
  const isGone = real_date_in_seconds >= date.end
  const isLive = real_date_in_seconds >= date.start && real_date_in_seconds < date.end
  const hours_duration = end.hour - start.hour
  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div className="w-full relative h-10 flex items-center justify-between text-muted-foreground">
        {
          isLive &&
          <Redline
            duration_hour={hours_duration}
            start_hour={start.hour}
            start_minute={start.minute}
            end_hour={end.hour}
            end_minute={end.minute}
          />
        }
        <LiveMarking
          duration={hours_duration}
          start={{ hour: start.hour, minute: start.minute }}
          end={{ hour: end.hour, minute: end.minute }}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <span className="relative -left-[18px] text-xs text-muted-foreground">{ start.toFormat('HH:mm') }</span>
        <span className="relative -right-[18px] text-xs text-muted-foreground">{ end.toFormat('HH:mm') }</span>
      </div>
    </div>
  )
}

export default LiveIndicator