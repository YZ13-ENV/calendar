'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

// TODO -> Надо унифицировать этот компонент + два варианта, один дефолтный, второй с плавающей полоской
const list = (prefix?: string) => {
  const tabs = [
    {
      label: 'Событие',
      value: '/'
    },
    {
      label: 'Задачи',
      value: '/todo'
    },
    {
      label: 'Заметки',
      value: '/notes'
    },
    {
      label: 'Настройки',
      value: '/settings'
    }
  ].map(tab => ({ ...tab, value: prefix ? prefix + tab.value : tab.value  }))
  return tabs
}
type Props = {
  prefix?: string
}
const EventNav = ({ prefix }: Props) => {
  const path = usePathname()
  const fullPrefix = '/event/' + prefix
  const listWithPrefix = list(fullPrefix)
  const { push } = useRouter()
  const value = useMemo(() => {
    if (path === fullPrefix) return path + '/'
    return path
  },[path, fullPrefix])
  return (
    <Tabs value={value} onValueChange={value => push(value)}>
      <TabsList>
        {
          listWithPrefix.map(tab =>
            <TabsTrigger key={tab.value} value={tab.value}>{ tab.label }</TabsTrigger>
          )
        }
      </TabsList>
    </Tabs>
  )
}

export default EventNav