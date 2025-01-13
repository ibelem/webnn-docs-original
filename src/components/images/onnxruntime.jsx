import Image from 'next/image'
 
export default function OnnxRuntime() {
  return (
    <Image
      src="/static/images/logo/onnx-runtime.svg"
      width={300}
      height={300}
      alt="Onnx Runtime Web"
    />
  )
}