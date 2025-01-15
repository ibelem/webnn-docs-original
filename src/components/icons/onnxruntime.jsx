import Image from 'next/image'
 
export default function OnnxRuntime() {
  return (
    <div className="fw-logo">
      <Image
        src="/static/images/logo/onnx-runtime.svg"
        className="onnx-runtime-logo"
        width={300}
        height={300}
        alt="Onnx Runtime Web"
      />
    </div>
  )
}