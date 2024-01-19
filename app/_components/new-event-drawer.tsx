'use client'
import DatePicker from '@/components/shared/date-picker'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { BiPlus, BiRightArrowAlt } from 'react-icons/bi'

const NewEventDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='gap-2'><BiPlus size={18} />Добавить</Button>
      </DrawerTrigger>
      <DrawerContent className='max-w-md mx-auto w-full'>
        <div className="w-full h-fit flex flex-col p-6">
          <Input placeholder='Название' />
          <DatePicker onSelect={date => console.log(date.toFormat('dd-MM-yyyy'))} />
          <div className="w-full my-4 flex items-center justify-center gap-2">
            <Input className='w-1/2' placeholder='Начало' />
            <BiRightArrowAlt size={18} />
            <Input className='w-1/2' placeholder='Конец' />
          </div>
          <Input placeholder='Описание' />
          <Button className='w-full mt-6'>Добавить</Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NewEventDrawer