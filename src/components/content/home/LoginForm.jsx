'use client'
import { useState, useReducer, useEffectEvent } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import { toast } from 'sonner'
import { emailHelper, minLength, checkEmpty } from '@/lib/helper'
import { cn } from '@/lib/utils'

// form login admin Email & Password

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  const handleSubmit = () => {
    console.log('masuuukk')
    // toast("Event has been created.")
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
      {/* ini buka re render tapi re create element ini sehingga elementnya mempunyai css yang fresh*/}
      {/* sangat optimal karena jika tidak triger state change maka tidak perlu animasi lagi */}

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
      />
    </>
  )
}

export default LoginForm
