'use client'
import React from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import StyledCalender from '@/components/form/StyledCalender'
import StyledDropDown from '@/components/form/StyledDropDown'

const RegisterForm = () => {
  const handleTambah = () => {
    console.log('register')
  }

  return (
    <>
      <div
        id="name_group"
        className="flex gap-4"
      >
        <div className="w-full">
          <h3 className="input_label">{`Nama Depan`}</h3>
          <StyledInput
            className="mt-3"
            placeholder="Nama Depan"
          />
        </div>

        <div className="w-full">
          <h3 className="input_label">{`Nama Belakang`}</h3>
          <StyledInput
            className="mt-3"
            placeholder="Nama Belakang"
          />
        </div>
      </div>

      <div
        id="jenis_bod"
        className="flex gap-4 mt-3"
      >
        <div className="w-full">
          <h3 className="input_label">{`Jenis Kelamin`}</h3>
          <div className="mt-3">
            <StyledDropDown />
          </div>
        </div>

        <div className="w-full">
          <h3 className="input_label">{`Tanggal Lahir`}</h3>
          <div className="mt-3">
            <StyledCalender />
          </div>
        </div>
      </div>

      {/* up here batas  */}

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
