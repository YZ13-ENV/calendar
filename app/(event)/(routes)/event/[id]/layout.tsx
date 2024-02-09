import UserSection from "@/components/widgets/header/user-section"
import EventNav from "../../../_components/event-nav"
import { calendar } from "@/api/calendar"
import { getVisitorId } from "@/helpers/cookies"
import { notFound, redirect } from "next/navigation"

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
  if (!event) return notFound()
  if (!visitorId || !eventAuthorIsMatching) return redirect('/')
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-fit flex items-center justify-between border-b py-4 px-6 bg-card">
        <EventNav prefix={id} />
        <div className="flex items-center gap-2">
          <UserSection />
        </div>
      </div>
      {children}
    </div>
  )
}

export default layout