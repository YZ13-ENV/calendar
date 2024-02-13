import UserSection from "@/components/widgets/header/user-section"
import EventNav from "../../../_components/event-nav"
import { calendar } from "@/api/calendar"
import { getVisitorId } from "@/helpers/cookies"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BiLeftArrowAlt } from "react-icons/bi"
import Link from "next/link"
import { DateTime } from "luxon"

type Props = {
  children: JSX.Element | JSX.Element[]
  params: {
    id: string
  }
}
const layout = async({ children, params }: Props) => {
  const eventId = params.id
  const event = await calendar.event.get(eventId)
  const visitorId = getVisitorId()
  const eventAuthorIsMatching = event && visitorId ? event.author === visitorId : false
  const { id } = params
  const key = event ? DateTime.fromSeconds(event.date.start).toFormat('dd-MM-yyyy') : null
  if (!event) return notFound()
  if (!visitorId || !eventAuthorIsMatching) return redirect('/')
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-16 shrink-0 flex items-center justify-between border-b py-4 px-6 bg-card">
        <div className="flex items-center gap-2">
          <Button variant='ghost' asChild size='icon'>
            <Link href={key ? `/month/${key}` : '/month'}>
              <BiLeftArrowAlt size={20} />
            </Link>
          </Button>
          <EventNav prefix={id} />
        </div>
        <div className="flex items-center gap-2">
          <UserSection />
        </div>
      </div>
      { children }
    </div>
  )
}

export default layout