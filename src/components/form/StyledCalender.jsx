'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import NextImage from '../global/NextImage'

const StyledCalender = ({onChange}) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(undefined)

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : 'Pilih Tanggal'}

            <NextImage
              src="./asset/icon/calendar-icon.svg"
              // className={ImageRender.className}
              alt="calendar icon"
              width={15}
              height={15}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date),
              setOpen(false),
              onChange(date)
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default StyledCalender
