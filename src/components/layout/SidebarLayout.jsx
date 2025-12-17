'use client'

import { useEffect, useState } from 'react'
import { useSidebar, SidebarTriggerOut } from '@/components/ui/sidebar'
import SidebarApp from '@/components/global/SidebarApp'

export default function SidebarLayout({ children }) {
  const { open } = useSidebar()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // return null / saat SSR Return null
  }

  return (
    <>
      {open ? <SidebarApp /> : <SidebarTriggerOut />}
      <main>{children}</main>
    </>
  )
}
