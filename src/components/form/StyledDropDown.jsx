import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import NextImage from '../global/NextImage'


// values adalah default jika tidak ada maka gunakan place holder
const StyledDropDown = ({ value, onChange }) => {
  const [selected, setSelected] = React.useState(undefined)

useEffect(() => {
    if (!value) return

    if (value === 'male') setSelected('Laki - Laki')
    if (value === 'female') setSelected('Perempuan')
  }, [value])

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
          <button className='w-full' onClick={() =>{ onChange('male'), setSelected('Laki - Laki')}}>
            <DropdownMenuItem >Laki - Laki</DropdownMenuItem>
          </button>
          <DropdownMenuSeparator />
          <button className='w-full' onClick={() => { onChange('female'), setSelected('Perempuan')}}>
          <DropdownMenuItem>Perempuan </DropdownMenuItem>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StyledDropDown
