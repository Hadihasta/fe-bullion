import React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from "@/components/ui/spinner"
// label
// onclick function
// classname  custome class
// disable status
// loading

const ButtonStyled = ({ label, onClick, className, disableStatus ,loading}) => {
  const defaultStyle =
    ' flex justify-center gap-[5px] justify w-full rounded-lg font-bold text-white p-2  transition-colors duration-200  text-sm '

  
  return (
    <>
    <button
      onClick={onClick}
      className={`${cn(disableStatus ? 'bg-grayDisable cursor-not-allowed' : ' bg-primaryOrange hover:bg-secondaryOrange cursor-pointer')} ${defaultStyle}  ${className}  `}
     disabled={disableStatus}
    >
      {label}  {loading && <Spinner /> }
    </button >
     
      </>
  )
}

export default ButtonStyled
