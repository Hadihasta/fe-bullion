'use client'
import { useState } from 'react'
import StyledInput from '@/components/form/StyledInput'
import ButtonStyled from '@/components/global/ButtonStyled'

// form login admin Email & Password
const handleInput = (e) => {
  console.log('bab', e)
}

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <h3 className="input_label">{`Email`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan email"
        onChange={(e) => handleInput(e.target.value)}
        type="text"
        value={email}
      />

      <h3 className="input_label mt-3">{`Password`}</h3>
      <StyledInput
        className="mt-3"
        placeholder="Masukan password"
        onChange={(e) => handleInput(e.target.value)}
        type="text"
        value={password}
      />

      <ButtonStyled className='mt-5' label='Masuk'/>
    </>
  )
}

export default LoginForm
