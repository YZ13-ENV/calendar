'use client'

import { calendar } from "@/api/calendar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"

type Props = {
  id: string
}
const DeleteButton = ({ id }: Props) => {
  const { push } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const deleteEvent = async() => {
    setLoading(true)
    await calendar.event.delete(id)
    push(`/month`)
    setLoading(false)
  }
  return (
    <Button
      disabled={loading}
      className="w-fit gap-2"
      onClick={deleteEvent}
    >
      { loading && <BiLoaderAlt className="animate-spin" /> }
      Удалить событие
    </Button>
  )
}

export default DeleteButton