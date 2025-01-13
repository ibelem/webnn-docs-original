import Image from 'next/image'
 
export default function WebNn() {
  return (
    <Image
      src="/static/images/logo/webnn.svg"
      className="webnn-logo"
      width={300}
      height={300}
      alt="WebNN"
    />
  )
}