import { DateTime } from "luxon"

export type CalendarItem = {
    isRange?: boolean
    key: string // as yyyy-MM-dd
    date: DateTime
    items: DocCalendarEvent[]
}


export type CalendarEvent = {
    key: string // as 'dd-MM-yyyy'
    title: string
    description: string
    startDate: number // converted toSeconds()
    endDate: number // converted toSeconds()
    pinnedItems?: [] // Думаю просто id с референсом на item
}

export type DocCalendarEvent = { event_id: string } & CalendarEvent