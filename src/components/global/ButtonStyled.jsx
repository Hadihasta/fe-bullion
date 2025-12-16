import React from 'react'

const ButtonStyled = ({ label, color, onClick, className }) => {
  const defaultStyle =
    ' bg-primaryOrange w-full rounded-lg font-bold text-white p-2  transition-colors duration-200 cursor-pointer text-xs '

  //   const colorStyle =
  //     color === 'yellow' ? 'bg-yellowBg rounded-lg hover:bg-yellowHover ' : 'bg-BluePrimary hover:bg-BlueSecondary '

  return (
    <button
      onClick={onClick}
      className={`${defaultStyle}
     ${className}`}
    >
      {label}
    </button>
  )
}

export default ButtonStyled
