import { DateTime } from "luxon"

export type CalendarItems = (DocEvent)[]
export type CalendarItem = {
    isRange?: boolean
    key: string // as yyyy-MM-dd
    date: DateTime
    items: CalendarItems
}
export type EventTodo = {
    checked: boolean
    text: string
    performers: []
    deadline?: number // должен быть в пределах события
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
export type RecurringEvent = {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}
export type Event = {
    type: 'event'
    author: string
    key: string // dd-MM-yyyy
    name: string
    description?: string
    performers: [] // ответственные за событие
    date: {
        start: number,
        end: number
    }
    location?: {
        longitude: number
        latitude: number
    }
    createdAt: number
    recurring?: RecurringEvent
    attendees?: string[] // участники события? Кто будет принимать участие, но не будет ответственен за него
    todo?: EventTodo[]
    notes?: string[] // массив id заметок
    priority?: 'low' | 'medium' | 'high'
    status?: 'scheduled' | 'completed' | 'cancelled'
}
export type DocEvent = { doc_id: string } & Event
export type DocReminder = { doc_id: string } & Reminder
export type DocGEvent = { doc_id: string } & GlobalEvent