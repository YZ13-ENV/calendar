'use client'
import { calendar } from "@/api/calendar"
import { useDebounceEffect } from "ahooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { ForwardRefEditor } from 'ui'

type Props = {
  id: string
  description: string
}
const Description = ({ description, id }: Props) => {
  const [text, setText] = useState<string>(description)
  const { refresh } = useRouter()
  const updateDescription = async() => {
    await calendar.event.update(id, { description: text })
    toast('Описание обновлено')
    refresh()
  }
  useDebounceEffect(() => {
    if (description !== text) updateDescription()
  },[text, setText], { wait: 2000 })
  return <ForwardRefEditor className="md-layout" markdown={text} onChange={value => setText(value)} />
}

export default Description