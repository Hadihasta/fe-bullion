'use client'
import { useState, useReducer, useEffectEvent } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import { emailHelper, minLength, checkEmpty, hashSHA256 } from '@/lib/helper'
import { fetchlogin } from '@/services/authServices'
import { ToasterNotif } from '@/components/global/ToasterNotif'
import { useRouter } from "next/navigation"

// form login admin Email & Password

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)


  const router = useRouter()


  // initial state useReducer

  // function useReducer untuk validator password dan email
  const inputValidator = (state, action) => {
    switch (action.type) {
      case 'email_required': {
        return {
          // update state lama + state baru
          ...state,
          emailRequired: action.nextEmailRequired,
        }
      }
      case 'email_checker': {
        return {
          // update state lama + state baru
          ...state,
          email: action.nextEmail,
        }
      }
      case 'passsword_required': {
        return {
          ...state,

          passwordRequired: action.nextPasswordRequired,
        }
      }
      case 'password_checker': {
        return {
          ...state,
          password: action.nextPassword,
        }
      }
      case 'disable_validator': {
        return {
          ...state,
          disabled: action.nextDisabled,
        }
      }
    }
    throw Error('Unknown action.')
  }

  const [state, dispatch] = useReducer(inputValidator, {
    emailRequired: false,
    email: false,
    passwordRequired: false,
    password: false,
  })

  //check email and password kosong  trigger setiap onchange input
  const onInputedValue = useEffectEvent((value, field) => {
    // trigger button could press if any changes in password and email
    setIsDisabled(false)
    // check email empty string ?
    switch (field) {
      case 'email':
        const isEmailEmpty = checkEmpty(value)
        if (isEmailEmpty) {
          dispatch({ type: 'email_required', nextEmailRequired: true })
        } else {
          dispatch({ type: 'email_required', nextEmailRequired: false })
        }

        break
      case 'password':
        // check password empty string ?
        const isPasswordEmpty = checkEmpty(value)
        if (isPasswordEmpty) {
          dispatch({ type: 'passsword_required', nextPasswordRequired: true })
        } else {
          dispatch({ type: 'passsword_required', nextPasswordRequired: false })
        }
        break

      default:
        break
    }
  })

  const handleInput = (e, key) => {
    switch (key) {
      case 'email':
        //  check format email jika benar
        const emailChecker = emailHelper(e)
        if (emailChecker) {
          // kalau benar hilangkan warning
          dispatch({ type: 'email_checker', nextEmail: false })
        } else {
          // kalau salah format munculkan warning
          dispatch({ type: 'email_checker', nextEmail: true })
        }
        // useEffectEvent check email empty string ?
        onInputedValue(e, 'email')
        // set email input terupdate
        setEmail(e)

        break
      case 'password':
        // check password minimum 8 characther
        // value, minimum length
        const checkPasswordLength = minLength(e, 8)
        if (checkPasswordLength) {
          dispatch({ type: 'password_checker', nextPassword: false })
        } else {
          dispatch({ type: 'password_checker', nextPassword: true })
        }

        onInputedValue(e, 'password')
        setPassword(e)

        break

      default:
        break
    }
  }

  const getErrorMessage = (key) => {
    switch (key) {
      case 'email':
        return 'Please Input Email Properly e.g. user@gmail.com'
      case 'email_required':
        return 'Email Cannot be Empty !!!'
      case 'password':
        return 'Minimum 8 Characther, Please re-Input Your Password'
      case 'password_required':
        return 'Password Cannot be Empty !!!'

      default:
        break
    }
  }

  const validateSubmit = () => {
    const emailEmpty = checkEmpty(email)
    const emailInvalid = !emailHelper(email)
    const passwordEmpty = checkEmpty(password)
    const passwordInvalid = !minLength(password, 8)
    // jika email empty true
    if (emailEmpty) {
      dispatch({ type: 'email_required', nextEmailRequired: true })
    }
    // jika email tidak berformat email dan email empty false
    if (emailInvalid && !emailEmpty) {
      dispatch({ type: 'email_checker', nextEmail: true })
    }
    // jika password empty true
    if (passwordEmpty) {
      dispatch({ type: 'passsword_required', nextPasswordRequired: true })
    }
    // jika password tidak lebih dari 8 dan password empty false
    if (passwordInvalid && !passwordEmpty) {
      dispatch({ type: 'password_checker', nextPassword: true })
    }

    // kalau salah satu ada yang true akan true
    return emailEmpty || emailInvalid || passwordEmpty || passwordInvalid
  }

  const handleSubmit = async () => {
    try {
      
      const hasError = validateSubmit()
      if (hasError) return

      setLoading(true)
      setIsDisabled(true)
      const payload = {
        email,
        password: hashSHA256(password),
      }
      const res = await fetchlogin(payload)

      if(res.status === 200) { 
       const token = res.data?.token

      if (token) {
        localStorage.setItem("token", token)
      }


      ToasterNotif('succes', `${res.message === '' ? 'Successfully Logged In!' : res.message} `, '#22c55e')
      setLoading(false)
      setIsDisabled(false)

      router.push('/dashboard')
      }
      
      // console.log(res.data)

    } catch (error) {
      setIsDisabled(false)
      setLoading(false)
      if (error.response.status === 400) {
        // console.log(errorMessage)
        const errorMessage = error.response.data.err_message
        ToasterNotif(
          'error',
          `${errorMessage === '' ? 'Something Goes Wrong...' : error.response.data.err_message}`,
          '#ef4444'
        )
      } else {
        ToasterNotif('error', `${'Something Goes Wrong...'}`, '#ef4444')
      }
    }
  }

  return (
    <>
      {/* ○ Required
        ○ Must be email format */}
      <h3 className="input_label">{`Email`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan email"
        onChange={(e) => handleInput(e.target.value, 'email')}
        type="text"
        value={email}
      />
      {state.emailRequired && (
        <div className="warning_label animate-fade-in mt-2">{getErrorMessage('email_required')}</div>
      )}
      {state.email && <div className="warning_label animate-fade-in mt-2">{getErrorMessage('email')}</div>}
      {/* ○ Required
        ○ Minimal character 8 */}
      <h3 className="input_label mt-3">{`Password`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan password"
        onChange={(e) => handleInput(e.target.value, 'password')}
        type="password"
        value={password}
      />

      {state.passwordRequired && (
        <div className="warning_label animate-fade-in mt-2">{getErrorMessage('password_required')}</div>
      )}
      {state.password && <div className="warning_label animate-fade-in mt-2">{getErrorMessage('password')}</div>}

      <ButtonStyled
        className="mt-5"
        label="Masuk"
        onClick={handleSubmit}
        disableStatus={isDisabled}
        loading={loading}
      />
    </>
  )
}

export default LoginForm
