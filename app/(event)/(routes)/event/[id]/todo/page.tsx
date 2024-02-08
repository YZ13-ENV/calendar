import { calendar } from "@/api/calendar"
import NewTodoModal from "@/app/(event)/_components/todo/new-todo-modal"
import { Checkbox } from "@/components/ui/checkbox"
import { EventTodo } from "@/types/calendar"

type Props = {
  params: {
    id: string
  }
}
const page = async({ params }: Props) => {
  const { id } = params
  const event = await calendar.event.get(id)
  const todos = event && event.todo ? event.todo : []
  const updateEvent = async() => {
    const newTodo: EventTodo = {
      checked: false,
      performers: [],
      text: ''
    }
    todos.push(newTodo)
    await calendar.event.update(id, { todo: todos })
  }
  return (
    <div className="max-w-7xl w-full mx-auto h-full flex flex-col py-12 px-6">
      <h1 className="text-4xl font-bold">Задачи</h1>
      <div className="w-full h-full flex flex-col mt-6">
        <div className='w-full flex items-center justify-end'>
          <NewTodoModal />
        </div>
        {
          !!todos.length
          ? todos.map((todo, index) =>
            <div key={todo.deadline || `todo#${index}`} className="w-full flex items-center gap-2 px-2 h-9 border-b">
              <div className='w-fit h-fit flex items-center gap-2'>
                <Checkbox checked={todo.checked} />
                <span className="text-sm text-accent-foreground">{todo.text}</span>
              </div>
              <div className='w-fit h-fit flex items-center gap-2'></div>
            </div>
          )
          :<div className='w-full h-full flex flex-col items-center justify-center'>
            <span className='text-center text-sm text-muted-foreground'>Нет задач</span>
          </div>
        }
      </div>
    </div>
  )
}

export default page