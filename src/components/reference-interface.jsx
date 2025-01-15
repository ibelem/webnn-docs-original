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

export default function ReferenceCards() {
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