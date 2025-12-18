import React, { useReducer, useState, useEffect } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import StyledCalender from '@/components/form/StyledCalender'
import StyledDropDown from '@/components/form/StyledDropDown'
import StyledInputPassword from '@/components/form/StyledInputPassword'
import { StyledUploudPhoto } from '@/components/form/StyledUploudPhoto'
import { ToasterNotif } from '@/components/global/ToasterNotif'
import {
  formatDateOfBirth,
  emailHelper,
  minLength,
  hashSHA256,
  hasAlphabetAndNumber,
  hasCapitalLetter,
  maxFileSize,
  isJpgOrJpeg,
} from '@/lib/helper'
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

const ContentModalEdit = ({ id, onSubmit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const { values, errors, touched } = state
  useEffect(() => {
    // console.log(id, " first fire")
    if (!id) return

    // console.log(id)

    const inspectUser = async (data) => {
      try {
        const id = data

        const res = await getDetailUser(id)
        // console.log(res, ' <<<< fetch detail untuk initial state')
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
            photo: user.photo,
            // password: '',
            // confirmPassword: '',
          },
        })
      } catch (error) {}
    }

    inspectUser(id)
  }, [id])

  const validators = {
    first_name: (v) => (!v ? 'Nama depan wajib diisi' : ''),
    last_name: (v) => (!v ? 'Nama belakang wajib diisi' : ''),
    gender: (v) => (!v ? 'Jenis Kelamin wajib diisi' : ''),
    date_of_birth: (v) => (!v ? 'Tanggal Lahir Wajib diisi' : ''),
    email: (v) => {
      if (!v) return 'Email wajib diisi'
      if (!emailHelper(v)) return 'Format email tidak valid'
      return ''
    },
    phone: (v) => (!v ? 'No HP wajib diisi' : ''),
    address: (v) => (!v ? 'Email wajib diisi' : ''),

    password: (v) => {
      if (!v) return 'Password wajib diisi'
      if (!minLength(v, 8)) return 'Minimal 8 karakter'
      if (!hasAlphabetAndNumber(v)) return 'Harus Memiliki Huruf dan Angka'
      if (!hasCapitalLetter(v)) return 'Harus Memiliki Huruf Kapital'
      return ''
    },
    confirmPassword: (v, values) => {
      if (!v) return 'Confirm Password wajib diisi'
      if (v !== values.password) return 'Password tidak sama'
      return ''
    },
    photo: (v) => {
      if (!v) return 'Photo wajib diisi'
      if (!maxFileSize(v, 5)) return 'Maximal Size 5 MB'
      if (!isJpgOrJpeg(v)) return 'Foto Harus JPG/JPEG'
      return ''
    },
  }

  const handleInput = (name, value) => {
    // console.log(name, value, ' <<<< here input parent')
    // setiap ada perubahan undisable
    setIsDisabled(false)
    dispatch({ type: 'CHANGE', name, value })

    if (validators[name]) {
      // console.log(validators[name])
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
      setLoading(true)

      // loop value jika ada erornya maka validator eror muncul
      Object.entries(values).forEach(([key, value]) => {
        handleInput(key, value)
      })
      // kalau ada eror jangan lakukan apa apa dan set jadi disable / undisable di input
      if (validateSubmit()) {
        setLoading(false)
        setIsDisabled(true)
        // console.log('fail schema')
        return
      }
      // console.log('succes schema')

      const hashedPassword = hashSHA256(values.password)
      const payload = {
        id,
        body: {
          ...values,
        password: hashedPassword,
        },
      }

      // console.log('edit PAYLOAD:', payload)

      const res = await editUser(payload)
      // console.log(res, ' <<<< ')
      if (res.status === 200) {
     ToasterNotif('succes', `${res.message === '' ? 'Successfully Logged In!' : res.message} `, '#22c55e')
        // close modal
        onSubmit()
      }

      // console.log('REGISTER PAYLOAD:', state)
      // send to form handler later
      setLoading(false)
    } catch (error) {
      if (error.response.status === 400) {
        // console.log(errorMessage)
        const errorMessage = error.response.data.err_message
        ToasterNotif(
          'error',
          `${errorMessage === '' ? 'Something Goes Wrong...' : error.response.data.err_message}`,
          '#ef4444'
        )
        setLoading(false)
        return
      }

      if (error) {
        ToasterNotif('error', `${'Something Goes Wrong Please Contact Administrator...'}`, '#ef4444')
      }
      setLoading(false)
    }
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
            <StyledDropDown
              onChange={(val) => handleInput('gender', val)}
              value={values.gender}
            />
          </div>
          {touched.gender && errors.gender && <div className="warning_label animate-fade-in mt-2">{errors.gender}</div>}
        </div>

        {/* Date of Birth
            ○ Required */}

        <div className="w-full">
          <h3 className="input_label">{`Tanggal Lahir`}</h3>
          <div className="mt-3">
            <StyledCalender
              onChange={(val) => handleInput('date_of_birth', formatDateOfBirth(val))}
              value={values.date_of_birth}
            />
            {touched.date_of_birth && errors.date_of_birth && (
              <div className="warning_label animate-fade-in mt-2">{errors.date_of_birth}</div>
            )}
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
      {touched.email && errors.email && <div className="warning_label animate-fade-in mt-2">{errors.email}</div>}

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
      {touched.phone && errors.phone && <div className="warning_label animate-fade-in mt-2">{errors.phone}</div>}

      {/* Address
        ○ Required */}

      <h3 className="input_label mt-3">{`Alamat`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukkan Alamat"
        value={values.address}
        onChange={(e) => handleInput('address', e.target.value)}
      />
      {touched.address && errors.address && <div className="warning_label animate-fade-in mt-2">{errors.address}</div>}

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
            {touched.password && errors.password && (
              <div className="warning_label animate-fade-in mt-2">{errors.password}</div>
            )}
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
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="warning_label animate-fade-in mt-2">{errors.confirmPassword}</div>
            )}
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
        {touched.photo && errors.photo && <div className="warning_label animate-fade-in mt-2">{errors.photo}</div>}
      </div>

      <ButtonStyled
        className="mt-5 "
        label="Simpan"
        onClick={handleEditUser}
        disableStatus={isDisabled}
        loading={loading}
      />
    </>
  )
}

export default ContentModalEdit
