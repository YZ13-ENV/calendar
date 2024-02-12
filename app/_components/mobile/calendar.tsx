'use client'

import { useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import ExpandedCalendar from "./expanded-calendar"
import NotExpandedCalendar from "./not-expanded-calendar"

const Calendar = () => {
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <div className="w-full rounded-b-xl border bg-card">
      {
        expand
        ? <ExpandedCalendar />
        : <NotExpandedCalendar />
      }
      <div onClick={() => setExpand(!expand)} className="w-full h-fit py-4 flex items-center justify-center">
        {
          expand
          ? <BiChevronUp size={20} />
          : <BiChevronDown size={20} />
        }
      </div>
    </div>
  )
}

export default Calendar