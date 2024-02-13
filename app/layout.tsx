import './globals.css'
import 'ui/dist/style.css'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import StateProvider from '@/components/StateProvider'
import GlobalDateUpdater from '@/components/shared/global-date-updater'
import EventsAnnouncer from '@/components/shared/events-announcer'
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
        <StateProvider>
          <GlobalDateUpdater />
          <EventsAnnouncer />
          {children}
        </StateProvider>
      </body>
    </html>
  )
}
