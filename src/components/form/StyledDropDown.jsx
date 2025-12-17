import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import NextImage from '../global/NextImage'

const StyledDropDown = () => {
  const [selected, setSelected] = React.useState(undefined)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal "
        >
          {selected ? selected : 'Pilih Jenis Kelamin'}

          <NextImage
            src="./asset/icon/downarrow-icon.svg"
            // className={ImageRender.className}
            alt="calendar icon"
            width={15}
            height={15}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
      >
        <div className="font-semibold">
          <button className='w-full' onClick={() => setSelected('Laki - Laki')}>
            <DropdownMenuItem >Laki - Laki</DropdownMenuItem>
          </button>
          <DropdownMenuSeparator />
          <button className='w-full' onClick={() => setSelected('Perempuan')}>
          <DropdownMenuItem>Perempuan</DropdownMenuItem>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StyledDropDown
