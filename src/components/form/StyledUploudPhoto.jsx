import clsx from 'clsx'
import NextImage from '../global/NextImage'

export function StyledUploudPhoto({ className,  onChange }) {
  return (
    <div className="relative flex-row">
      <input
        id="picture"
        type="file"
        className={clsx(
          className,
          'w-full rounded-lg dark:bg-dark p-2',
          'border border-borderDefault',
          'hover:border-primaryOrange focus:outline-none focus:ring-0 '
        )}
         onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) {
          onChange(file)
        }
      }}
      />
      <NextImage
        src="./asset/icon/cloud-upload.svg"
        className="absolute right-4 top-7"
        alt="cloud upload"
        width={20}
        height={20}
      />
    </div>
  )
}
