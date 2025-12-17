'use client'
import React from 'react'

const ButtonAddUser = () => {
  const handleInput = () => {
    console.log('masukk')
  }

  return (
    <button onClick={handleInput}>
      <div className="text-white bg-primaryOrange rounded-lg text-sm px-4 py-3.5 cursor-pointer">Tambah User</div>
    </button>
  )
}

export default ButtonAddUser
