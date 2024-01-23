'use client'
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { usePathname, useRouter } from "next/navigation"

const ViewSelect = () => {
  const views = [
    {
      label: "День",
      value: "day"
    },
    {
      label: "Неделя",
      value: "week"
    },
    {
      label: "Месяц",
      value: "month"
    },
    {
      label: "Год",
      value: "year"
    }
  ]
  const path = usePathname()
  const [debouncedSelected, setDebouncedSelected] = useState(views[0].value)
  const [selected, setSelected] = useState<string>(views[0].value)
  const { push } = useRouter()
  useEffect(() => {
    const onlyValues = views.map(view => view.value)
    const cleanPath = path.split('/').filter(part => part)
    const detectedValue = onlyValues.includes(cleanPath[0])
    if (detectedValue) {
      setSelected(cleanPath[0])
      setDebouncedSelected(cleanPath[0])
    }
  },[path])
  useEffect(() => {
    if (selected !== debouncedSelected) {
      const replaced = path.replace(debouncedSelected, selected)
      push(replaced)
      setDebouncedSelected(selected)
    }
  },[selected, setSelected])
  return (
    <Select value={selected} onValueChange={value => setSelected(value)}>
      <SelectTrigger>{views.find(view => view.value === selected)?.label}</SelectTrigger>
      <SelectContent>
        {
          views.map(view =>
            <SelectItem key={'view-type-' + view.value} value={view.value}>{view.label}</SelectItem>
          )
        }
      </SelectContent>
    </Select>
  )
}

export default ViewSelect