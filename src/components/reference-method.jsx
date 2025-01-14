import React from "react";
import Image from 'next/image'
import { Cards } from 'nextra/components'

function MethodIcon() {
  return (
    <Image
      src="/static/images/icon/method.svg"
      className="reference-icon"
      width={20}
      height={20}
      alt="Method"
    />
  )
}

const api = [
  ['createContext', 'ml#createcontext'],
  ['dispatch', 'mlcontext#dispatch'],
  ['createTensor', 'mlcontext#createtensor'],
  ['readTensor', 'mlcontext#readtensor'],
  ['writeTensor', 'mlcontext#writetensor'],
  ['opSupportLimits', 'mlcontext#opsupportlimits'],
]

export default function MethodCards() {
  return (
  <Cards>
    {api.map(([title, href], index) => (
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