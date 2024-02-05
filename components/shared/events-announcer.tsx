'use client'
import { useEffect, useState } from "react"
import { Toaster } from "../ui/sonner"
import { calendar } from "@/api/calendar"
import { DocEvent } from "@/types/calendar"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/app"
import { useAppSelector } from "../entities/store/store"
import { useDebounceEffect } from "ahooks"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
// import {  } from 'api'

const EventsAnnouncer = () => {
  const [user] = useAuthState(auth)
  const date = useAppSelector(state => state.globalDate.date)
  const [events, setEvents] = useState<DocEvent[]>([])
  const [announcedEvents, setAnnouncedEvents] = useState<string[]>([])
  const { push } = useRouter()
  const openEvent = (eventId: string) => push(`/event/${eventId}`)
  useDebounceEffect(() => {
    if (!!events.length) events.forEach(event => {
      const eventTime = event.date.start
      const inSeconds = date.toSeconds()
      const isPassed = inSeconds > eventTime
      // console.log(inSeconds, eventTime)
      if (!isPassed) {
        const diff = eventTime - inSeconds
        const diffInMins = diff / 60
        // console.log(diffInMins)
        const isAnnounced = announcedEvents.includes(event.doc_id)
        if (diffInMins <= 5 && !isAnnounced) {
          toast(`Событие - "${event.name}" скоро начнётся`, { action: { label: 'Перейти', onClick: () => openEvent(event.doc_id) } })
          setAnnouncedEvents([...announcedEvents, event.doc_id])
        }
      }
    })
  },[date, events], { maxWait: 2000 })
  useEffect(() => {
    if (user) calendar.events.get(user.uid)
    .then(events => setEvents(events))
  },[user])
  return (
    <Toaster />
  )
}

export default EventsAnnouncer