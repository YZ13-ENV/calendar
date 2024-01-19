'use client'

import { BiCalendar } from "react-icons/bi"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from '../ui/calendar'
import { DateTime } from "luxon"

type Props = {
  onSelect: (date: DateTime) => void
}
const DatePicker = ({ onSelect }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant='outline' className='mt-4 gap-2 text-muted-foreground'><BiCalendar /> Выберите дату</Button></PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <Calendar mode="single" onSelect={date => date && onSelect(DateTime.fromJSDate(date))} />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker