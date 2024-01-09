import './globals.css'
import 'ui/dist/style.css'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400', '300', '200'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'DM Calendar',
  description: 'Created by DM Family team'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={first_font.className}>
      <body className='dark'>{children}</body>
    </html>
  )
}
