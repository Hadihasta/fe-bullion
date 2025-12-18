'use client'
import { useReducer, useState } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import StyledCalender from '@/components/form/StyledCalender'
import StyledDropDown from '@/components/form/StyledDropDown'
import StyledInputPassword from '@/components/form/StyledInputPassword'
import { StyledUploudPhoto } from '@/components/form/StyledUploudPhoto'
import { formatDateOfBirth, emailHelper, minLength } from '@/lib/helper'

// Form Register

const initialState = {
  values: {
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    photo: null,
  },
  errors: {},
  touched: {},
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
        touched: {
          ...state.touched,
          [action.name]: true,
        },
      }

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.name]: action.error,
        },
      }

    default:
      return state
  }
}

const RegisterForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [loading, setLoading] = useState(false)

  const { values, errors, touched } = state

  const validators = {
    first_name: (v) => (!v ? 'Nama depan wajib diisi' : ''),
    last_name: (v) => (!v ? 'Nama belakang wajib diisi' : ''),
    email: (v) => {
      if (!v) return 'Email wajib diisi'
      if (!emailHelper(v)) return 'Format email tidak valid'
      return ''
    },
    phone: (v) => (!v ? 'No HP wajib diisi' : ''),
    password: (v) => {
      if (!v) return 'Password wajib diisi'
      if (!minLength(v, 8)) return 'Minimal 8 karakter'
      return ''
    },
    confirmPassword: (v, values) => (v !== values.password ? 'Password tidak sama' : ''),
  }

  const handleInput = (name, value) => {
    console.log(name, value, ' <<<< here input parent')
    dispatch({ type: 'CHANGE', name, value })

    if (validators[name]) {
      const error = validators[name](value, values)
      dispatch({ type: 'SET_ERROR', name, error })
    }
  }

  const validateSubmit = () => {
    let hasError = false

    Object.keys(validators).forEach((key) => {
      const error = validators[key](values[key], values)
      if (error) hasError = true

      dispatch({ type: 'SET_ERROR', name: key, error })
    })

    return hasError
  }

  const handleTambah = () => {
    // kalau ada eror jangan lakukan apa apa
    // if (validateSubmit()) return

    setLoading(true)

    console.log('REGISTER PAYLOAD:', values)
    // console.log('REGISTER PAYLOAD:', state)

    // send to form handler later
    // handleFormData()
    setLoading(false)
  }

  const handleFormData = () => {
    const formData = new FormData()

    formData.append('first_name', values.first_name)
    formData.append('last_name', values.last_name)
    formData.append('gender', values.gender)
    formData.append('date_of_birth', values.date_of_birth)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    formData.append('address', values.address)
    formData.append('password', values.password)
    formData.append('photo', values.photo)

    const obj = Object.fromEntries(formData.entries())
    console.log(obj)
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
            value={values.firstName}
            onChange={(e) => handleInput('first_name', e.target.value)}
          />
          {touched.first_name && errors.first_name && (
            <div className="warning_label animate-fade-in mt-2">{errors.first_name}</div>
          )}
        </div>

        <div className="w-full">
          <h3 className="input_label">{`Nama Belakang`}</h3>
          <StyledInput
            className="mt-3"
            placeholder="Nama Belakang"
            value={values.lastName}
            onChange={(e) => handleInput('last_name', e.target.value)}
          />
          {touched.last_name && errors.last_name && (
            <div className="warning_label animate-fade-in mt-2">{errors.last_name}</div>
          )}
        </div>
      </div>

      <div
        id="jenis_bod"
        className="flex gap-4 mt-3"
      >
        <div className="w-full">
          <h3 className="input_label">{`Jenis Kelamin`}</h3>
          <div className="mt-3">
            <StyledDropDown onChange={(val) => handleInput('gender', val)} />
          </div>
        </div>

        <div className="w-full">
          <h3 className="input_label">{`Tanggal Lahir`}</h3>
          <div className="mt-3">
            <StyledCalender onChange={(val) => handleInput('date_of_birth', formatDateOfBirth(val))} />
          </div>
        </div>
      </div>

      <h3 className="input_label mt-3">{`Email`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan Email"
        value={values.email}
        onChange={(e) => handleInput('email', e.target.value)}
      />

      <h3 className="input_label mt-3">{`No. Handphone`}</h3>
      <StyledInput
        type="number"
        className="mt-3"
        placeholder="Masukkan no handphone"
        value={values.phone}
        onChange={(e) => handleInput('phone', e.target.value)}
        onWheel={(e) => e.target.blur()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
          }
        }}
      />

      <h3 className="input_label mt-3">{`Alamat`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukkan Alamat"
        value={values.address}
        onChange={(e) => handleInput('address', e.target.value)}
      />

      {/* handle here */}
      <div
        id="password"
        className="flex gap-4 mt-3"
      >
        <div className="w-full">
          <h3 className="input_label">{`Password`}</h3>
          <div className="mt-3">
            <StyledInputPassword
              placeholder="Masukkan password"
              value={values.password}
              onChange={(e) => handleInput('password', e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <h3 className="input_label whitespace-nowrap">{`Konfirmasi Password`}</h3>
          <div className="mt-3">
            <StyledInputPassword 
             placeholder="Konfirmasi password"
              value={values.confirmPassword}
              onChange={(e) => handleInput('confirmPassword', e.target.value)}/>
          </div>
        </div>
      </div>

      <h3 className="input_label mt-3">{`Foto Profil`}</h3>
      <div className="mt-3">
        <StyledUploudPhoto className="mt-3"  
        value={values.photo}
        onChange={(val) => handleInput('photo', val)}/>
      </div>

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
