import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { DocEvent, Event } from "@/types/calendar"

export const calendar = {
  events: {
    get: async(id: string): Promise<DocEvent[]> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/calendar/events/${id}`
        const res = await fetch(url, { method: 'GET', headers: headers })
        if (res.ok) return await res.json() as DocEvent[]
        return []
      } catch (e) {
        return []
      }
    }
  },
  event: {
    create: async(event: Event): Promise<DocEvent | null> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        headers.append('Content-Type', 'application/json')
        const url = `${api_host}/calendar/event`
        const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(event) })
        if (res.ok) return await res.json() as DocEvent
        return null
      } catch (e) {
        return null
      }
    },
    get: async(eventId: string): Promise<DocEvent | null> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/calendar/event?eventId=${eventId}`
        const res = await fetch(url, { method: 'GET', headers: headers })
        if (res.ok) return await res.json() as DocEvent
        return null
      } catch (e) {
        return null
      }
    },
    update: async(eventId: string, event: Partial<Event>): Promise<DocEvent | null> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        headers.append('Content-Type', 'application/json')
        const url = `${api_host}/calendar/event?eventId=${eventId}`
        const res = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(event) })
        if (res.ok) return await res.json() as DocEvent
        return null
      } catch (e) {
        return null
      }
    },
    delete: async(eventId: string): Promise<boolean> => {
      try {
        const headers = new Headers()
        const authHeader = authorizationHeader()
        headers.append('authorization', authHeader || '')
        const url = `${api_host}/calendar/event?eventId=${eventId}`
        const res = await fetch(url, { method: 'DELETE', headers: headers })
        if (res.ok) return Boolean(await res.text())
        return false
      } catch (e) {
        return false
      }
    },
  }
}