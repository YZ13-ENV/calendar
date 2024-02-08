import NotificationsWrapper from "@/components/shared/notifications"
import User from "@/components/shared/user-circle"
import { ProjectsGrid } from "ui"

const UserSection = () => {
  return (
    <>
      <NotificationsWrapper />
      <div className="shrink-0"><ProjectsGrid /></div>
      <div className="shrink-0"><User /></div>
    </>
  )
}

export default UserSection