import { calendar } from "@/api/calendar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { BiRightArrowAlt } from "react-icons/bi"
import dynamic from "next/dynamic"
const Description = dynamic(() => import("@/app/(event)/_components/description"), {
  ssr: false,
  loading: () => <>
    <div className="w-full h-8 rounded-lg bg-muted animate-pulse" />
    <div className="w-1/2 h-8 rounded-lg bg-muted animate-pulse" />
    <div className="w-1/3 h-8 rounded-lg bg-muted animate-pulse" />
  </>
})
const LiveIndicator = dynamic(() => import("@/app/(event)/_components/live-indicator"), {
  ssr: false,
  loading: () => <div className="w-full h-fit flex flex-col gap-4">
    <div className="w-full h-10 rounded-lg bg-muted animate-pulse"></div>
    <div className="w-full flex items-center justify-between">
      <span className="w-16 h-4 rounded-md bg-muted animate-pulse" />
      <span className="w-16 h-4 rounded-md bg-muted animate-pulse" />
    </div>
  </div>
})

type Props = {
  params: {
    id: string
  }
}
const page = async({ params }: Props) => {
  const eventId = params.id
  const event = await calendar.event.get(eventId)
  const haveTodos = event && event.todo
  if (!event) return null
  return (
    <>
    <div className="w-full h-fit px-6 pt-12 pb-6 max-w-7xl mx-auto flex flex-col">
      <h1 className="text-4xl text-accent-foreground font-bold">{event.name}</h1>
      <div className="w-full mt-12">
        <LiveIndicator date={event.date} />
      </div>
      <div className="w-full flex items-center justify-end">
        {
          haveTodos &&
          <Button className='w-fit gap-2 my-4' variant='outline'>
            Перейти к задачам
            <BiRightArrowAlt size={16} />
          </Button>
        }
      </div>
    </div>
    <Separator className="my-2" />
    <div className='w-full h-fit px-6 py-12 max-w-7xl mx-auto flex flex-col gap-4'>
      <Description description={event.description || 'Начните вводить...'} id={eventId} />
    </div>
    </>
  )
}
export default page