import NextImage from '@/components/global/NextImage'
import RegisterForm from '@/components/content/sign-up/RegisterForm'

export default function page() {
  const logoWaterMark = './asset/logo/logomark-bei-white-no-bg.svg'
  const logoBullionNoBg = './asset/logo/logo-bullion-no-bg.svg'

  const ImageRender = [
    {
      src: logoWaterMark,
      className: 'absolute  top-0 left-0 w-[90%] ',
      width: 605,
      height: 552,
      alt: 'Bullion Logo',
    },
    {
      src: logoBullionNoBg,
      className: '',
      width: 104,
      height: 32,
      alt: 'Bullion Watermark',
    },
  ]

  return (
    <main className=" min-h-screen  justify-center flex-row">
      <div className="bg-primaryBlue vw-40 relative p-60 hidden md:block ">
        {ImageRender.map((value, index) => (
          <NextImage
            key={index}
            src={value.src}
            className={value.className}
            alt={value.alt}
            width={value.width}
            height={value.height}
          />
        ))}
      </div>
      <div className="bg-white  vw-100 md:vw-60  flex-row-center p-60">
        <div className=' lg:min-w-101.25  min-w-50'>
          <div>
            <h1 className='page_label pb-8 whitespace-nowrap'>
              {`Daftar`}
            </h1>
          </div>
          <div id='input-group'>
            <RegisterForm/>
          </div>
          </div>
      </div>
    </main>
  )
}
