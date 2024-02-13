'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { MdEventNote } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { BiCog } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

// TODO -> Надо унифицировать этот компонент + два варианта, один дефолтный, второй с плавающей полоской
type NavItem = {
  label: string
  value: string
  icon?: JSX.Element
}
const list = (prefix?: string): NavItem[] => {
  const tabs: NavItem[] = [
    {
      label: 'Событие',
      value: '/',
      icon: <MdEventNote />
    },
    {
      label: 'Задачи',
      value: '/todo',
      icon: <LuListTodo />
    },
    // {
      // label: 'Заметки',
      // value: '/notes'
    // },
    {
      label: 'Настройки',
      value: '/settings',
      icon: <BiCog />
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
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const value = useMemo(() => {
    if (path === fullPrefix) return path + '/'
    return path
  },[path, fullPrefix])
  return (
    <Tabs value={value} onValueChange={value => push(value)}>
      <TabsList>
        {
          listWithPrefix.map(tab =>
            <TabsTrigger key={tab.value} className="min-h-7 gap-2 min-w-10" value={tab.value}>
              { tab.icon && tab.icon }
              { !isMobile && tab.label }
            </TabsTrigger>
          )
        }
      </TabsList>
    </Tabs>
  )
}

export default EventNav