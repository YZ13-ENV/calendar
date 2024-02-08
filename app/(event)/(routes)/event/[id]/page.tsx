import { calendar } from "@/api/calendar"
import { Separator } from "@/components/ui/separator"
import { getVisitorId } from "@/helpers/cookies"
import { DateTime } from "luxon"
import { notFound, redirect } from "next/navigation"
import { BiChevronRight, BiTime } from "react-icons/bi"
import { MDXRemote } from 'next-mdx-remote/rsc'

type Props = {
  params: {
    id: string
  }
}
const page = async({ params }: Props) => {
  const { fromSeconds } = DateTime
  const eventId = params.id
  const event = await calendar.event.get(eventId)
  const visitorId = getVisitorId()
  const eventAuthorIsMatching = event && visitorId ? event.author === visitorId : false
  const start = event ? fromSeconds(event.date.start) : null
  const end = event ? fromSeconds(event.date.end) : null
  if (!event) return notFound()
  if (!visitorId || !eventAuthorIsMatching) return redirect('/')
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
      {
        event.description &&
        <div className="w-full md-layout">
          <MDXRemote source={event.description} />
        </div>
      }

    </div>
  )
}
export default page