import { Montserrat } from 'next/font/google'
import '@/styles/globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})


export default function RootLayout({ children }) {
  return (
    <>
      <main
        className={`
          ${montserrat.variable}
          antialiased
        `}
      >
        {children}
      </main>
    </>
  )
}
