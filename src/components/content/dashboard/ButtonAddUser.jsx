'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonAddUser = () => {
  const router = useRouter()

  const handleInput = () => {
    router.push('/sign-up')
  }

  return (
    <button onClick={handleInput}>
      <div className="text-white bg-primaryOrange rounded-lg text-sm px-4 py-3.5 cursor-pointer">Tambah User</div>
    </button>
  )
}

export default ButtonAddUser
