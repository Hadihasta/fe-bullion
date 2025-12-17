import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import { SidebarTriggerOut } from '@/components/ui/sidebar'
import NextImage from './NextImage'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'



const logoWaterMark = './asset/logo/logo-bei-color.svg'
  

  const ImageRender = [
    {
      src: logoWaterMark,
      className: '',
      width: 104,
      height: 32,
      alt: 'Bullion Logo',
    },
  ]


const items = [
  {
    title: 'Store',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Manage Menu',
    url: '/manage-menu',
    icon: Inbox,
  },
  // {
  //   title: 'Calendar',
  //   url: '#',
  //   icon: Calendar,
  // },
  // {
  //   title: 'Search',
  //   url: '#',
  //   icon: Search,
  // },
  // {
  //   title: 'Settings',
  //   url: '#',
  //   icon: Settings,
  // },
]

const SidebarApp = () => {
  return (
      <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup className='px-5 '>
          <div className="flex justify-between items-center">
        {ImageRender.map((value, index) => (
          <NextImage
            key={index}
            src={value.src}
            className={value.className}
            alt={value.alt}
            width={value.width}
            height={value.height}
          />
        ))}

            <SidebarTriggerOut/>
          </div>
       
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} >
                      <item.icon />
                      <span className='font-bold'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarApp