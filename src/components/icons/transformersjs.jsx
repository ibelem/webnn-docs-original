import Image from 'next/image'
 
export default function TransformersJs() {
  return (
    <div className="fw-logo">
      <Image
        src="/static/images/logo/transformers-js.svg"
        width={300}
        height={300}
        alt="Transformers.js"
      />
    </div>
  )
}