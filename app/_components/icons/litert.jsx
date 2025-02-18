import Image from 'next/image'
 
export default function LiteRt() {
  return (
    <div className="fw-logo">
      <Image
        src="/public/logo/lite-rt.png"
        className="lite-rt-logo"
        width={70}
        height={20}
        alt="Lite RT"
      />
    </div>
  )
}