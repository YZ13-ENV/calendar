'use client'
import { calendar } from '@/api/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { EventTodo } from '@/types/calendar'
import { useRouter } from 'next/navigation'

type Props = {
  id: string
  todo: EventTodo
  todos: EventTodo[]
  index: number
}
const Todo = ({ id, index, todos, todo }: Props) => {
  const { refresh } = useRouter()
  const updateTodo = async(newTodoProps: Partial<EventTodo>) => {
    const updatedTodo: EventTodo = {
      ...todo,
      ...newTodoProps
    }
    const updatedTodos = todos.map((_, i) => {
      if (i === index) return updatedTodo
      return _
    })
    await calendar.event.update(id, { todo: updatedTodos })
    refresh()
  }
  return (
    <div key={todo.deadline || `todo#${index}`} className="w-full flex items-center gap-2 px-2 h-9 border-b">
      <div className='w-fit h-fit flex items-center gap-2'>
        <Checkbox checked={todo.checked} onCheckedChange={checked => updateTodo({ checked: Boolean(checked) })} />
        <span className="text-sm text-accent-foreground">{todo.text}</span>
      </div>
      <div className='w-fit h-fit flex items-center gap-2'></div>
    </div>
  )
}

export default Todo