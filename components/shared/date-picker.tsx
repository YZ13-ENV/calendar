'use client'

import { BiCalendar } from "react-icons/bi"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from '../ui/calendar'
import { DateTime } from "luxon"
import { useState } from "react"

type Props = {
  onSelect: (date: DateTime) => void
}
const DatePicker = ({ onSelect }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const action = (date: Date | undefined) => {
    if (date) {
      onSelect(DateTime.fromJSDate(date))
      setOpen(false)
    }
  }
  return (
    <Popover open={open} onOpenChange={state => setOpen(state)}>
      <PopoverTrigger asChild><Button variant='outline' className='mt-4 gap-2 text-muted-foreground'><BiCalendar /> Выберите дату</Button></PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <Calendar mode="single" onSelect={action} />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker