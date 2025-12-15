import NextImage from '@/components/global/NextImage'

export default function Home() {
  const logoWaterMark = './asset/logo/logomark-bei-white-no-bg.svg'
  const logoBullionNoBg = './asset/logo/logo-bullion-no-bg.svg'

  const ImageRender = [
    {
      src: logoWaterMark,
      className: 'absolute  top-0 left-0 w-[90%] ',
      width: 605,
      height: 552,
    },
      {
      src: logoBullionNoBg,
      className: '',
      width: 104,
      height: 32,
    },
  ]

  return (
    <main className=" min-h-screen  flex-row">
      <div className="bg-primaryOrange vw-40 relative p-60 ">

    {ImageRender.map((value,index)=> (
        <NextImage src={value.src} className={value.className} alt={value.alt} width={value.width} height={value.height}/>
    ))}

      </div>
      <div className="bg-white vw-60"> test</div>
    </main>
  )
}
