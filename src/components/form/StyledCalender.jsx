'use client'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import NextImage from '../global/NextImage'


const StyledCalender = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(undefined)

  useEffect(() => {
    // console.log(value)

     if (!value) return
    setDate(new Date(value))
  }, [value])

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
          onSelect={(selectedDate) => {
            if (!selectedDate) return

            setDate(selectedDate)
            setOpen(false)
            // kirim ke parent sebagai ISO string
            onChange(selectedDate.toISOString())
          }}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default StyledCalender
