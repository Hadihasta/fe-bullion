import { Montserrat } from 'next/font/google'
import '@/styles/globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'Bullion Website',
  description: 'Manage User BEI Account',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  )
}
