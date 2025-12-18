import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const StyledInputPassword = ({ className, ...rest }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative w-full max-w-sm">
      <input
        type={showPassword ? 'text' : 'password'}
        className={clsx(
          className,
          'w-full rounded-lg dark:bg-dark p-2',
          'border border-borderDefault',
          'focus:border-primaryOrange focus:outline-none focus:ring-0 '
        )}
        {...rest}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff
            className="h-4 w-4"
            color="#FD5725"
          />
        ) : (
          <Eye
            className="h-4 w-4"
            color="#FD5725"
          />
        )}
      </Button>
    </div>
  )
}

export default StyledInputPassword
