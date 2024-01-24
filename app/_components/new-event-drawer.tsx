'use client'
import { calendar } from '@/api/calendar'
import DatePicker from '@/components/shared/date-picker'
import Textarea from '@/components/shared/textarea'
import TimePicker, { TimePickerAnswer } from '@/components/shared/time-picker'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Event } from '@/types/calendar'
import { auth } from '@/utils/app'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiChevronDown, BiLoaderAlt, BiPlus, BiRightArrowAlt, BiX } from 'react-icons/bi'

const NewEventDrawer = () => {
  const { refresh } = useRouter()
  const { now } = DateTime
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [user] = useAuthState(auth)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<DateTime | null>(null)
  const [start, setStart] = useState<TimePickerAnswer>('0:0')
  const [end, setEnd] = useState<TimePickerAnswer>('0:0')
  const startRange = start.split(':')
  const disabled = !date || !name
  const createEvent = async() => {
    if (user && date) {
      setLoading(true)
      const parsedStart = start.split(':').map(_ => parseInt(_))
      const parsedEnd = end.split(':').map(_ => parseInt(_))
      const startDate = date.set({ hour: parsedStart[0], minute: parsedStart[1] })
      const endDate = date.set({ hour: parsedEnd[0], minute: parsedEnd[1] })
      const event: Event = {
        type: 'event',
        author: user.uid,
        key: date.toFormat('dd-MM-yyyy'),
        name: name,
        performers: [],
        createdAt: now().toSeconds(),
        date: {
          start: startDate.toSeconds(),
          end: endDate.toSeconds()
        }
      }
      if (description.length) event.description = description
      await calendar.event.create(event)
      setLoading(false)
      setName('')
      setDescription('')
      setDate(null)
      setStart('0:0')
      setEnd('0:0')
      refresh()
      setOpen(false)
    }
  }
  return (
    <Drawer open={open} onOpenChange={state => setOpen(state)}>
      <DrawerTrigger asChild>
        <Button disabled={!user} size='sm' className='gap-2'><BiPlus size={18} />Добавить</Button>
        {/* <div className="w-fit flex items-center"> */}
          {/* <Button className='gap-2 rounded-none rounded-l-md' disabled={!user}><BiPlus size={18} />Добавить</Button> */}
          {/* <Button className='rounded-none rounded-r-md' size='icon'><BiChevronDown /></Button> */}
        {/* </div> */}
      </DrawerTrigger>
      <DrawerContent className='max-w-md mx-auto w-full'>
        <div className="w-full h-fit flex flex-col p-6">
          <Input placeholder='Название' value={name} onChange={e => setName(e.target.value)} />
          {
            date
            ? <div className='w-full h-9 flex items-center justify-center mt-4 gap-2 rounded-md border'>
              <span className='text-center text-sm text-muted-foreground'>
                {date.setLocale('ru').toFormat('dd MMMM yyyy')}
              </span>
              <BiX onClick={() => setDate(null)} className='cursor-pointer' />
            </div>
            : <DatePicker onSelect={date => setDate(date)} />
          }
          <div className="w-full my-4 flex items-center justify-center gap-2">
            <TimePicker className='w-1/2'
            onTimeChange={time => setStart(time)} />
            <BiRightArrowAlt size={18} />
            <TimePicker className='w-1/2'
            hourStartAt={parseInt(startRange[0])}
            minuteStartAt={parseInt(startRange[1])}
            onTimeChange={time => setEnd(time)} />
          </div>
          <Textarea value={description} onChange={e => setDescription(e.target.value)}
          placeholder='Описание' className='text-sm p-3 rounded-lg border min-h-28' />
          <Button onClick={createEvent} disabled={disabled} className='w-full mt-6 gap-2'>
            { loading && <BiLoaderAlt className='animate-spin' /> }
            Добавить
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NewEventDrawer