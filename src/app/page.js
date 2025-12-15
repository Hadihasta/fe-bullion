import Image from 'next/image'

export default function Home() {
  
  const logoBullionNoBg = './asset/logo/logo-bullion-no-bg.svg'
  const logoWaterMark = './asset/logo/logomark-bei-white-no-bg.svg'
  return (
    <main className=" min-h-screen  flex-row">
      <div className="bg-primaryOrange vw-40 relative p-60 ">
        <Image
          className="absolute  top-0 left-0 w-[90%] "
          src={logoWaterMark}
          alt="Bullion WaterMark"
          width={605}
          height={552}
          priority
        />
        <Image
          className=""
          src={logoBullionNoBg}
          alt="Bullion Asset"
          width={104}
          height={32}
          priority
        />
      </div>
      <div className="bg-white vw-60"> test</div>
    </main>
  )
}
