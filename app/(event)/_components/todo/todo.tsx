'use client'
import { calendar } from '@/api/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { EventTodo } from '@/types/calendar'
import { useRouter } from 'next/navigation'
import { BiTrashAlt } from 'react-icons/bi'

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
  const deleteTodo = async() => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    await calendar.event.update(id, { todo: updatedTodos })
    refresh()
  }
  return (
    <div key={todo.deadline || `todo#${index}`} className="w-full flex justify-between items-center gap-2 px-2 h-9 border-b group">
      <div className='w-fit h-fit flex items-center gap-2'>
        <Checkbox checked={todo.checked} onCheckedChange={checked => updateTodo({ checked: Boolean(checked) })} />
        <span className="text-sm text-accent-foreground">{todo.text}</span>
      </div>
      <div className='w-fit h-fit flex items-center gap-2'>
        <button onClick={deleteTodo} className='h-full group-hover:flex items-center justify-center px-2 hidden'>
          <BiTrashAlt size={16} />
        </button>
      </div>
    </div>
  )
}

export default Todo