import { Montserrat } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
import SidebarLayout from '@/components/layout/SidebarLayout'
import '@/styles/globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({ children }) {
  return (
    <SidebarProvider defaultOpen>
          <SidebarLayout></SidebarLayout>
        <div className={`${montserrat.variable} antialiased bg-backgroundGray grow`}>
          {children}
        </div>
    </SidebarProvider>
  )
}
