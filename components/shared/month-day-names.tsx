import { cn } from "@/lib/utils"

type Props = {
  short?: boolean
  noBorder?: boolean
  size?: 'sm' | 'xs' | 'base'
  centered?: boolean
}
const MonthDayNames = ({ centered=false, short=false, size='xs', noBorder=false }: Props) => {
  const day_names = [
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье",
  ]
  const short_day_names = [
    "пн",
    "вт",
    "ср",
    "чт",
    "пт",
    "сб",
    "вс"
  ]
  const text_size = size === 'base' ? "text-base" : size === 'sm' ? 'text-sm' : size === 'xs' ? 'text-xs' : 'text-base'
  return (
    <div className={cn(
      text_size,
      noBorder ? "" : "border-b border-x",
      "w-full h-fit shrink-0 grid grid-cols-7 grid-rows-1 bg-card"
    )}>
      {
        (
          short
          ? short_day_names
          : day_names
        )
        .map(name =>
          <div className={cn(
            centered ? "flex items-center justify-center" : "",
            "w-full h-full py-1 px-3"
          )} key={name}>
            <span className={cn(
              centered ? 'text-center' : 'text-start',
              "text-muted-foreground"
            )}>{ name }</span>
          </div>
        )
      }
    </div>
  )
}

export default MonthDayNames