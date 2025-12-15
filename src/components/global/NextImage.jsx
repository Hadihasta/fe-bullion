import Image from 'next/image'

const NextImage = (props) => {
    const {src , className,  alt , width, height } = props
  return (
    <>
      <Image
        className={className}
        src={src}
        alt={alt}
        width={width} 
        height={height}
        priority
      />
    </>
  )
}

export default NextImage
