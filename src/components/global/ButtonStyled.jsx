import React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from "@/components/ui/spinner"
// label
// onclick function
// classname  custome class
// disable status
// loading



const ButtonStyled = ({ label, onClick, className, disableStatus ,loading , color}) => {
  const defaultStyle =
    ' flex justify-center gap-[5px] justify w-full rounded-lg font-bold text-white p-2  transition-colors duration-200  text-sm '

  const backgroundColor =  (color === 'blue' ? 'bg-primaryBlue hover:bg-secondaryBlue' : 'bg-primaryOrange hover:bg-secondaryOrange') 
  return (
    <>
    <button
      onClick={onClick}
      className={`${cn(disableStatus ? 'bg-grayDisable! cursor-not-allowed' : 'cursor-pointer')} ${defaultStyle} ${backgroundColor}  ${className}  `}
     disabled={disableStatus}
    >
      {label}  {loading && <Spinner /> }
    </button >
     
      </>
  )
}

export default ButtonStyled
