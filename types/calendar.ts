import { DateTime } from "luxon"


export type CalendarItems = (DocEvent)[]
export type CalendarItem = {
    isRange?: boolean
    key: string // as yyyy-MM-dd
    date: DateTime
    items: CalendarItems
}

// Можно помечать праздники, или выходные через GlobalEvent
export type GlobalEvent = {
    type: 'global-event'
    name: string
    description?: string
    key: string // dd-MM-yyyy
    duration: number // in days, ex. duration: 7
}
export type Reminder = {
    type: 'reminder'
    author: string
    key: string // dd-MM-yyyy
    name: string
    description?: string
    remindAt: number
}
export type Event = {
    type: 'event'
    author: string
    key: string // dd-MM-yyyy
    name: string
    description?: string
    performers: []
    date: {
        start: number,
        end: number
    }
}

export type DocEvent = { doc_id: string } & Event
export type DocReminder = { doc_id: string } & Reminder
export type DocGEvent = { doc_id: string } & GlobalEvent