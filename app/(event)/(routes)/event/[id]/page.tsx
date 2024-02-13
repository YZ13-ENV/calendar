import { calendar } from "@/api/calendar"
import { Separator } from "@/components/ui/separator"
import Description from "@/app/(event)/_components/description"
import LiveIndicator from "@/app/(event)/_components/live-indicator"

type Props = {
  params: {
    id: string
  }
}
const page = async({ params }: Props) => {
  const eventId = params.id
  const event = await calendar.event.get(eventId)
  if (!event) return null
  return (
    <>
    <div className="w-full h-fit px-6 pt-12 pb-6 max-w-7xl mx-auto flex flex-col">
      <h1 className="text-4xl text-accent-foreground font-bold">{event.name}</h1>
      <div className="w-full mt-12">
        <LiveIndicator date={event.date} />
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