import { CalendarItem, DocEvent } from "@/types/calendar"
import { DateTime } from "luxon"

export const mergeDayEvents = (day: CalendarItem, events: DocEvent[]): CalendarItem => {
    const matchedEvents = events.filter(event => event.key === day.key)
    return {
        ...day,
        items: matchedEvents
    }
}
export const generateMonthCalendar = (date: DateTime, events?: DocEvent[]) => {
    const currentMonthLastDay = date.daysInMonth
    const prevMonthLastDay = date.minus({ month: 1 }).daysInMonth

    const lastDayCurrentMonth = date.set({ day: currentMonthLastDay })
    const lastDayPrevMonth = date.set({ day: prevMonthLastDay, month: date.month - 1 })

    const dayBeforeFirstDay = lastDayPrevMonth.weekday;
    const predictedCount = dayBeforeFirstDay + lastDayCurrentMonth.day + (7 - lastDayCurrentMonth.weekday)
    const dayAfterLastDay = predictedCount === 42 ? 7 - lastDayCurrentMonth.weekday : 42 - predictedCount + 7 - lastDayCurrentMonth.weekday;
    const prevMonthItems: CalendarItem[] = []
    const currentMonthItems: CalendarItem[] = []
    const nextMonthItems: CalendarItem[] = []

    for (let i = (lastDayPrevMonth.day + 1) - dayBeforeFirstDay; i <= lastDayPrevMonth.day; i++) {
        const generatedDate = date.set({ day: i, month: date.month - 1 })
        const calendarItem: CalendarItem = {
            key: generatedDate.toFormat('dd-MM-yyyy'),
            date: generatedDate,
            items: []
        }
        prevMonthItems.push(calendarItem)
    }
    for (let i = 1; i <= lastDayCurrentMonth.day; i++) {
        const generatedDate = date.set({ day: i, month: date.month })
        const calendarItem: CalendarItem = {
            key: generatedDate.toFormat('dd-MM-yyyy'),
            date: generatedDate,
            items: []
        }
        currentMonthItems.push(calendarItem)
    }
    for (let i = 1; i <= dayAfterLastDay; i++) {
        const generatedDate = date.set({ day: i, month: date.month + 1 })
        const calendarItem: CalendarItem = {
            key: generatedDate.toFormat('dd-MM-yyyy'),
            date: generatedDate,
            items: []
        }
        nextMonthItems.push(calendarItem)
    }
    const result = [...prevMonthItems, ...currentMonthItems, ...nextMonthItems]
    if (events && events.length !== 0) {
        events.forEach(event => {
            const key = event.key
            const indexDay = result.findIndex(day => day.key === key)
            const isKeyInResult = indexDay > -1
            if (isKeyInResult) {
                result[indexDay].items.push(event)
            }
        })
    }
    return result
}