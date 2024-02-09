import DeleteButton from "@/app/(event)/_components/delete-button"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  const { id } = params
  return (
    <>
      <div className="w-full h-fit px-6 py-12 max-w-7xl mx-auto">
        <h1 className='text-4xl font-bold text-accent-foreground'>Настройки</h1>
      </div>
      <Separator />
      <div className="w-full h-fit px-6 py-12 max-w-7xl mx-auto flex flex-col gap-4">
        <span className="text-2xl font-semibold">Удалить событие</span>
        <DeleteButton id={id} />
      </div>
    </>
  )
}

export default page