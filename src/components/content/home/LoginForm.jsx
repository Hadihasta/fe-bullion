'use client'
import { useState } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'
import { toast } from "sonner"

// form login admin Email & Password

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleInput = (e, key) => {
    switch (key) {
      case 'email':
        toast("Event has been created.")
        // console.log(e, 'email')
        setEmail(e)
        break
      case 'password':
        setPassword(e)
        // console.log(e, 'password')
        break

      default:
        break
    }
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
      />
    </>
  )
}

export default LoginForm
