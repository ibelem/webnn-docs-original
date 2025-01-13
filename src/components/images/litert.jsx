import Image from 'next/image'
 
export default function LiteRt() {
  return (
    <Image
      src="/static/images/logo/lite-rt.png"
      className="lite-rt-logo"
      width={70}
      height={20}
      alt="Lite RT"
    />
  )
}