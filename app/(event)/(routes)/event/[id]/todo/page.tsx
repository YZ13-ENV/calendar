import { calendar } from "@/api/calendar"
import NewTodoModal from "@/app/(event)/_components/todo/new-todo-modal"
import Todo from "@/app/(event)/_components/todo/todo"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
  params: {
    id: string
  }
}
const page = async({ params }: Props) => {
  const { id } = params
  const event = await calendar.event.get(id)
  const todos = event && event.todo ? event.todo : []
  return (
    <div className="max-w-7xl w-full mx-auto h-full flex flex-col py-12 px-6">
      <div className='w-full flex items-center justify-between'>
        <h1 className="text-4xl font-bold">Задачи</h1>
        <NewTodoModal id={id} todos={todos} />
      </div>
      <div className="w-full h-full flex flex-col mt-6">
        {
          !!todos.length
          ? todos.map((todo, index) => <Todo key={todo.deadline || `todo#${index}`} todos={todos} id={id} index={index} todo={todo} />)
          :<div className='w-full h-full flex flex-col items-center justify-center'>
            <span className='text-center text-sm text-muted-foreground'>Нет задач</span>
          </div>
        }
      </div>
    </div>
  )
}

export default page