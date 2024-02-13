import { Separator } from "@/components/ui/separator"

type Props = {
  start?: {
    minute: number
    hour: number
  }
  end?: {
    minute: number
    hour: number
  }
  duration?: number
}
const LiveMarking = ({ duration=24, start={ hour: 0, minute: 0 }, end={ hour: 23, minute: 59 } }: Props) => {
  const duration_as_array = Array.from({ length: duration }).map((_, i) => start.hour + i)

  return (
    <>
        {
          duration_as_array.map((hour, index, arr) => {
            const minutes = index === 0 ? start.minute : index === arr.length - 1 ? end.minute : undefined
            return <MarkUnit key={index} minutes={minutes} isFirst={index === 0} />
          })
        }
    </>
  )
}
type MarkType = '1/3' | '2/3' | '3/3'
type MarkUnitProps = {
  minutes?: number
  isFirst?: boolean
}
const MarkUnit = ({ minutes=0, isFirst=false }: MarkUnitProps) => {
  const default_marks: MarkType[] = ['1/3', '2/3', '1/3', '3/3']
  const marks: MarkType[] =
  !minutes || minutes === 0
  ? isFirst ? ['3/3', ...default_marks] : default_marks
  : minutes >= 1 && minutes <= 15
  ? ['1/3', '2/3', '1/3', '3/3'] as MarkType[]
  : minutes >= 16 && minutes <= 30
  ? ['2/3', '1/3', '3/3'] as MarkType[]
  : minutes >= 31 && minutes <= 45
  ? ['1/3', '3/3'] as MarkType[]
  : minutes >= 46 && minutes <= 59
  ? ['3/3'] as MarkType[]
  : default_marks
  return (
    <>
      {
        marks.map((mark, i) => <MarkLine key={mark + '/'+ i} variant={mark} /> )
      }
    </>
  )
}
const MarkLine = ({ variant }: { variant: MarkType }) => {
  const height = variant === '1/3' ? 'h-1/3' : variant === '2/3' ? 'h-2/3' : variant === '3/3' ? 'h-full' : 'h-full'
  return <Separator orientation="vertical" className={height} />
}
export default LiveMarking