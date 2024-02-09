'use client'
import { calendar } from '@/api/calendar'
import Textarea from '@/components/shared/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { EventTodo } from '@/types/calendar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  id: string
  todos: EventTodo[]
}
const NewTodoModal = ({ todos, id }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)
  const disabled = !!!text
  const { refresh } = useRouter()
  const updateEvent = async() => {
    const newTodo: EventTodo = {
      checked: checked,
      performers: [],
      text: text
    }
    todos.push(newTodo)
    await calendar.event.update(id, { todo: todos })
    refresh()
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger asChild><Button>Добавить задачу</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>Новая задача</DialogHeader>
        <div className='w-full h-fit flex flex-col gap-4'>
          <div className="w-full h-fit flex items-start gap-2">
            <Checkbox className='mt-2' checked={checked} onCheckedChange={state => setChecked(Boolean(state))} />
            <Textarea value={text} onChange={e => setText(e.target.value)}
            className='w-full p-2 rounded-md border text-sm' placeholder='Напишите задачу' />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={updateEvent} disabled={disabled}>Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewTodoModal