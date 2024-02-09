'use client'
import { calendar } from "@/api/calendar"
import { Button } from "@/components/ui/button"
import { useDebounceEffect } from "ahooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiEdit, BiX } from "react-icons/bi"
import { toast } from "sonner"
import { ForwardRefEditor } from 'ui'

type Props = {
  id: string
  description: string
  children?: JSX.Element
}
const Description = ({ description, id, children }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
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
  return (
    <div className="w-full relative">
        <Button
          className="mb-4"
          size='icon'
          onClick={() => setEdit(!edit)}
          variant={edit ? 'outline' : 'default'}
        >{edit ? <BiX /> : <BiEdit />}</Button>
      {
        edit
        ? <ForwardRefEditor markdown={text} onChange={value => setText(value)} />
        : children
      }
    </div>
  )
}

export default Description