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
    title: 'User Aktif',
    url: '/dashboard',
    active: true,
    icon: Home,
  },
  {
    title: 'Menu 2',
    url: '',
    active: false,
    icon: Inbox,
  },
   {
    title: 'Menu 3',
    url: '',
    active: false,
    icon: Inbox,
  },
   {
    title: 'Menu 4',
    url: '',
    active: false,
    icon: Inbox,
  },
   {
    title: 'Menu 5',
    url: '',
    active: false,
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
         </SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className={`h-[45px]  ${item.active ? 'bg-primaryOrange' : ''}`} key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className='h-full' >
                      {/* <item.icon /> */}
                      <div className='p-2 bg-flamingo-900 rounded-xs'></div>
                      <span className=' text-sm'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
      
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarApp