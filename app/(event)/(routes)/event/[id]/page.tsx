import { calendar } from "@/api/calendar"
import { Separator } from "@/components/ui/separator"
import { DateTime } from "luxon"
import { BiChevronRight, BiTime } from "react-icons/bi"
import Description from "@/app/(event)/_components/description"
import { MDXRemote } from "next-mdx-remote/rsc"

type Props = {
  params: {
    id: string
  }
}
const page = async({ params }: Props) => {
  const { fromSeconds } = DateTime
  const eventId = params.id
  const event = await calendar.event.get(eventId)
  const start = event ? fromSeconds(event.date.start) : null
  const end = event ? fromSeconds(event.date.end) : null
  if (!event) return null
  return (
    <div className="w-full h-full px-6 py-12 max-w-7xl mx-auto flex flex-col gap-4">
      <h1 className="text-4xl text-accent-foreground font-bold">{event.name}</h1>
      <div className="w-fit flex items-center justify-between text-muted-foreground">
        <BiTime className="mr-2 text-accent-foreground" />
        <span>{start?.toFormat('HH:mm')}</span>
        <BiChevronRight className='text-muted-foreground shrink-0' size={24} />
        <span>{end?.toFormat('HH:mm')}</span>
      </div>
      <Separator className="my-2" />
      <Description description={event.description || ''} id={eventId}>
        <div className="w-full md-layout">
          <MDXRemote source={event.description || ''} />
        </div>
      </Description>
    </div>
  )
}
export default page