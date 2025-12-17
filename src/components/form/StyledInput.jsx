import clsx from 'clsx'


const StyledInput = ({className, ...rest}) => {
  return (
    <input
      className={clsx(
        className,
        'w-full rounded-lg dark:bg-dark p-2',
        'border border-borderDefault',
        'focus:border-primaryOrange focus:outline-none focus:ring-0 '
      )}
      {...rest}
    />
  )
}

export default StyledInput
