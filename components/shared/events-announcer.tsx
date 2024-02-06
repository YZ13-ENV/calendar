'use client'
import { useEffect, useState } from "react"
import { Toaster } from "../ui/sonner"
import { DocEvent } from "@/types/calendar"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/app"
import { useAppSelector } from "../entities/store/store"
import { useDebounceEffect } from "ahooks"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { io } from 'socket.io-client';
import { api_host } from "@/const/host"

const EventsAnnouncer = () => {
  const [user] = useAuthState(auth)
  const date = useAppSelector(state => state.globalDate.date)
  const [events, setEvents] = useState<DocEvent[]>([])
  const [preparedAnnouncedEvents, setPreparedAnnouncedEvents] = useState<string[]>([])
  const [startedAnnouncedEvents, setStartedAnnouncedEvents] = useState<string[]>([])
  const { push } = useRouter()
  const openEvent = (eventId: string) => push(`/event/${eventId}`)
  useDebounceEffect(() => {
    // console.log(events)
    if (!!events.length) events.forEach(event => {
      const eventTime = event.date.start
      const inSeconds = date.toSeconds()
      const isPassed = inSeconds > eventTime
      // console.log(inSeconds, eventTime)
      if (!isPassed) {
        const diff = eventTime - inSeconds
        const diffInMins = diff / 60
        // console.log(diffInMins)
        const isAnnouncedInPrepared = preparedAnnouncedEvents.includes(event.doc_id)
        const isAnnouncedInStarted = startedAnnouncedEvents.includes(event.doc_id)
        if (diffInMins <= 5 && !isAnnouncedInPrepared) {
          toast(`Событие - "${event.name}" скоро начнётся`, { action: { label: 'Перейти', onClick: () => openEvent(event.doc_id) } })
          setPreparedAnnouncedEvents([...preparedAnnouncedEvents, event.doc_id])
        }
        if (diffInMins >= -.5 && diffInMins <= .5 && !isAnnouncedInStarted) {
          toast(`Событие - "${event.name}" начинается`, { action: { label: 'Перейти', onClick: () => openEvent(event.doc_id) } })
          setStartedAnnouncedEvents([...startedAnnouncedEvents, event.doc_id])
        }
      }
    })
  },[date, events], { maxWait: 2000 })
  useEffect(() => {
    const socket = io(api_host)
    socket.on('connect', () => {
      console.log('Connected to events');
      if (user) {
        // console.log(user.uid)
        socket.emit('events', user.uid);
      }
    });
    socket.on('events', (data: DocEvent[]) => {
      setEvents(data)
      // console.log('received notifications', data);
    });
    socket.on('exception', (data) => {
      console.log('event', data);
    });
    socket.on('disconnect', () => {
      console.log('Disconnected');
    });
    return () => {
      socket.close()
    }
  },[user, user?.uid])
  return (
    <Toaster />
  )
}

export default EventsAnnouncer