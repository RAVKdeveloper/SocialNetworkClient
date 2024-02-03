import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { Providers } from '../Redux/Provider'
import AuthMeWidget from '@/components/widgets/AuthMe'
import '../styles/global.css'

const fount = IBM_Plex_Sans({ subsets: ['cyrillic', 'latin'], weight: ["400", "500","600", "700"]  })

export const metadata: Metadata = {
  title: 'Vkontakte',
  description: 'Social Network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={fount.className}>
        <Providers>
          <AuthMeWidget />
           {children}
        </Providers>
        </body>
    </html>
  )
}
