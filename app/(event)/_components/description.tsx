'use client'
import { calendar } from "@/api/calendar"
import { Button } from "@/components/ui/button"
import { useDebounceEffect } from "ahooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
    <div className="w-full">
      <div className="w-full h-fit flex items-center mb-4">
        <Button
          onClick={() => setEdit(!edit)}
          variant='outline'
        >{edit ? "Закрыть" : "Изменить"}</Button>
      </div>
      {
        edit
        ? <ForwardRefEditor markdown={text} onChange={value => setText(value)} />
        : children
      }
    </div>
  )
}

export default Description