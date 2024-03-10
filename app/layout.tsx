import StateProvider from '@/components/StateProvider'
import EventsAnnouncer from '@/components/shared/events-announcer'
import GlobalDateUpdater from '@/components/shared/global-date-updater'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import { WebVitals } from 'ui'
import 'ui/dist/style.css'
import './globals.css'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400', '300', '200'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Created by DM Family team'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={first_font.className}>
      <body className='dark'>
        <WebVitals appId="darkmaterial-calendar" />
        <StateProvider>
          <GlobalDateUpdater />
          <EventsAnnouncer />
          {children}
        </StateProvider>
      </body>
    </html>
  )
}
