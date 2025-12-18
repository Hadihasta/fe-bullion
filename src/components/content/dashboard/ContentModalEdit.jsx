import React, { useReducer, useState, useEffect } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import StyledCalender from '@/components/form/StyledCalender'
import StyledDropDown from '@/components/form/StyledDropDown'
import StyledInputPassword from '@/components/form/StyledInputPassword'
import { StyledUploudPhoto } from '@/components/form/StyledUploudPhoto'
import { formatDateOfBirth, emailHelper, minLength, hashSHA256 } from '@/lib/helper'
import { editUser, getDetailUser } from '@/services/adminService'

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
  case 'SET_INITIAL_VALUES':
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
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

const ContentModalEdit = (id) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [loading, setLoading] = useState(false)

  const { values, errors, touched } = state
  useEffect(() => {
    // console.log(id, " first fire")
    if (!id) return

    const inspectUser = async (data) => {
      try {
        const { id } = data

        const res = await getDetailUser(id)
        console.log(res, ' <<<< fetch detail untuk initial state')
        const user = res.data
        dispatch({
          type: 'SET_INITIAL_VALUES',
          payload: {
            first_name: user.first_name ?? '',
            last_name: user.last_name ?? '',
            gender: user.gender ?? '',
            date_of_birth: user.date_of_birth ?? '',
            email: user.email ?? '',
            phone: user.phone ?? '',
            address: user.address ?? '',
            photo: null,
            password: '',
            confirmPassword: '',
          },
        })

       
      } catch (error) {}
    }

    inspectUser(id)
  }, [id])

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
    // console.log(name, value, ' <<<< here input parent')
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

  const handleEditUser = async () => {
    try {
      // kalau ada eror jangan lakukan apa apa
      // if (validateSubmit()) return

      setLoading(true)

      const payload = {
        id,
        body: values,
      }

      console.log('edit PAYLOAD:', payload)

      //   const res = await editUser(payload)

      // console.log('REGISTER PAYLOAD:', state)

      // send to form handler later
      // handleFormData()
      setLoading(false)
    } catch (error) {}
  }

  return (
    <>
      <div
        id="name_group"
        className="flex gap-4"
      >
        {/* First Name
            ○ Required */}
        <div className="w-full">
          <h3 className="input_label">{`Nama Depan`}</h3>
          <StyledInput
            className="mt-3"
            placeholder="Nama Depan"
            value={values.first_name}
            onChange={(e) => handleInput('first_name', e.target.value)}
          />
          {touched.first_name && errors.first_name && (
            <div className="warning_label animate-fade-in mt-2">{errors.first_name}</div>
          )}
        </div>

        {/* Last Name
            ○ Required */}

        <div className="w-full">
          <h3 className="input_label">{`Nama Belakang`}</h3>
          <StyledInput
            className="mt-3"
            placeholder="Nama Belakang"
            value={values.last_name}
            onChange={(e) => handleInput('last_name', e.target.value)}
          />
          {touched.last_name && errors.last_name && (
            <div className="warning_label animate-fade-in mt-2">{errors.last_name}</div>
          )}
        </div>
      </div>

      {/* Gender
            ○ Required */}
      <div
        id="jenis_bod"
        className="flex gap-4 mt-3"
      >
        <div className="w-full">
          <h3 className="input_label">{`Jenis Kelamin`}</h3>
          <div className="mt-3">
            <StyledDropDown onChange={(val) => handleInput('gender', val)} value={values.gender} />
          </div>
        </div>

        {/* Date of Birth
            ○ Required */}

        <div className="w-full">
          <h3 className="input_label">{`Tanggal Lahir`}</h3>
          <div className="mt-3">
            <StyledCalender onChange={(val) => handleInput('date_of_birth', formatDateOfBirth(val))} />
          </div>
        </div>
      </div>

      {/* Email
        ○ Required
        ○ Must be email format */}

      <h3 className="input_label mt-3">{`Email`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan Email"
        value={values.email}
        onChange={(e) => handleInput('email', e.target.value)}
      />

      {/* Phone Number
        ○ Required */}

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

      {/* Address
        ○ Required */}

      <h3 className="input_label mt-3">{`Alamat`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukkan Alamat"
        value={values.address}
        onChange={(e) => handleInput('address', e.target.value)}
      />

      {/* Password
        ○ Required
        ○ Minimal character 8
        ○ Must have alphabet and number
         ○ Min 1 capital letter */}
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

        {/* Confirm Password
            ○ Required
            ○ Same as Password */}
        <div className="w-full">
          <h3 className="input_label whitespace-nowrap">{`Konfirmasi Password`}</h3>
          <div className="mt-3">
            <StyledInputPassword
              placeholder="Konfirmasi password"
              value={values.confirmPassword}
              onChange={(e) => handleInput('confirmPassword', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Photo Profile
        ○ Required
        ○ Max size: 5Mb
        ○ Format: JPG/JPEG */}

      <h3 className="input_label mt-3">{`Foto Profil`}</h3>
      <div className="mt-3">
        <StyledUploudPhoto
          className="mt-3"
          value={values.photo}
          onChange={(val) => handleInput('photo', val)}
        />
      </div>

      <ButtonStyled
        className="mt-5 "
        label="Simpan"
        onClick={handleEditUser}
        // disableStatus={isDisabled}
        // loading={loading}
      />
    </>
  )
}

export default ContentModalEdit
