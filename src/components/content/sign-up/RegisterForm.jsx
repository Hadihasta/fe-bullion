'use client'
import React from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'

const RegisterForm = () => {
  const handleTambah = () => {
    console.log('register')
  }

  return (
    <>
      <h3 className="input_label">{`Email`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan email"
      />

      <h3 className="input_label mt-3">{`Password`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan password"
      />

      <ButtonStyled
        className="mt-5 bg-primaryBlue!"
        label="Tambah"
        onClick={handleTambah}
        // disableStatus={isDisabled}
        // loading={loading}
      />
    </>
  )
}

export default RegisterForm
