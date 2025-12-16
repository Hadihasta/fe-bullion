'use client'
import { useState, useReducer } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import { toast } from 'sonner'
import { emailHelper } from '@/lib/helper'

// form login admin Email & Password

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleReducer = (state, action) => {
    switch (action.type) {
      case 'email_checker': {
        return {
          email: action.nextEmail,
        }
      }
      case 'changed_name': {
        return {
          name: action.nextName,
          age: state.age,
        }
      }
    }
    throw Error('Unknown action.')
  }

  const [state, dispatch] = useReducer(handleReducer, { email: false, password: false })

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
        setEmail(e)

        // console.log(emailChecker)
        break
      case 'password':
        setPassword(e)
        // console.log(e, 'password')
        break

      default:
        break
    }
  }

  const getErrorMessage = (key) => {
    switch (key) {
      case 'email':
        return 'Please Input Email Properly e.g. user@gmail.com'

      case 'password':
        return 'Please Input Email Properly e.g. user@gmail.com'
      // break;

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
      <h3 className="input_label">{`Email`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan email"
        onChange={(e) => handleInput(e.target.value, 'email')}
        type="text"
        value={email}
      />

      <div className="mt-3 text-red-600">{state.email && getErrorMessage('email')}</div>
 

      <h3 className="input_label mt-3">{`Password`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan password"
        onChange={(e) => handleInput(e.target.value, 'password')}
        type="password"
        value={password}
      />

      <ButtonStyled
        className="mt-5"
        label="Masuk"
        onClick={handleSubmit}
      />
    </>
  )
}

export default LoginForm
