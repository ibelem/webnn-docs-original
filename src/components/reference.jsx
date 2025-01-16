import React from "react";
import Image from 'next/image'
import { Cards } from 'nextra/components'

function InterfaceIcon() {
  return (
    <Image
      src="/static/images/icon/interface.svg"
      className="reference-icon"
      width={20}
      height={20}
      alt="Interface"
    />
  )
}

const api = [
  ['navigator.ml', 'navigatorml'],
  ['ML', 'ml'],
  ['MLContext', 'mlcontext'],
  ['MLGraph', 'mlgraph'],
  ['MLOperand', 'mloperand']
]

export function ReferenceCards() {
  return (
  <Cards>
    {api.map(([title, href], index) => (
      <Cards.Card 
        icon={<InterfaceIcon />}
        key={index} 
        title={title} 
        href={`./${href}`} 
      />
    ))}
  </Cards>
  )
}


function MethodIcon() {
  return (
    <Image
      src="/static/images/icon/method.svg"
      className="method-icon"
      width={20}
      height={20}
      alt="Method"
    />
  )
}

const api2 = [
  ['createContext', 'ml#createcontext'],
  ['dispatch', 'mlcontext#dispatch'],
  ['createTensor', 'mlcontext#createtensor'],
  ['readTensor', 'mlcontext#readtensor'],
  ['writeTensor', 'mlcontext#writetensor'],
  ['opSupportLimits', 'mlcontext#opsupportlimits'],
]

export function MethodCards() {
  return (
  <Cards>
    {api2.map(([title, href], index) => (
      <Cards.Card 
        icon={<MethodIcon />}
        key={index} 
        title={title} 
        href={`./${href}`} 
      />
    ))}
  </Cards>
  )
}

function CompatibilityIcon() {
  return (
    <Image
      src="/static/images/icon/compatibility.svg"
      className="compatibility-icon"
      width={20}
      height={20}
      alt="Compatibility"
    />
  )
}

const api3 = [
  ['WebNN Interfaces', 'browser-compatibility#webnn-apis'],
  ['LiteRT Backend', 'browser-compatibility#litert-backend--chromeos-linux-windows-and-android'],
  ['DirectML Backend', 'browser-compatibility#directml-backend--windows'],
  ['CoreML Backend', 'browser-compatibility#coreml-backend--macos'],
]

export function CompatibilityCards() {
  return (
  <Cards>
    {api3.map(([title, href], index) => (
      <Cards.Card 
        icon={<CompatibilityIcon />}
        key={index} 
        title={title} 
        href={`./${href}`} 
      />
    ))}
  </Cards>
  )
}