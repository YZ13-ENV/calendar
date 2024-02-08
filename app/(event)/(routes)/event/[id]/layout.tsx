import UserSection from "@/components/widgets/header/user-section"
import EventNav from "../../../_components/event-nav"

type Props = {
  children: JSX.Element | JSX.Element[]
  params: {
    id: string
  }
}
const layout = ({ children, params }: Props) => {
  const { id } = params
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-fit flex items-center justify-between border-b p-6 bg-card">
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