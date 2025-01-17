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
  ['navigator.ml', 'webnn/navigatorml'],
  ['ML', 'webnn/ml'],
  ['MLContext', 'webnn/mlcontext'],
  ['MLGraph', 'webnn/mlgraph'],
  ['MLOperand', 'webnn/mloperand'],
  ['MLTensor', 'webnn/mltensor'],
  ['MLGraphBuilder', 'webnn/mlgraphbuilder']
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
  ['ml.createContext', 'webnn/ml#createcontext'],
  ['context.dispatch', 'webnn/mlcontext#dispatch'],
  ['context.createTensor', 'webnn/mlcontext#createtensor'],
  ['context.readTensor', 'webnn/mlcontext#readtensor'],
  ['context.writeTensor', 'webnn/mlcontext#writetensor'],
  ['context.opSupportLimits', 'webnn/mlcontext#opsupportlimits'],
  ['context.destory', 'webnn/mlcontext#destroy'],
  ['graph.destory', 'webnn/mlgraph#destroy'],
  ['tensor.destory', 'webnn/mltensor#destroy'],
  ['builder.input', 'webnn/mlgraphbuilder#input'],
  ['builder.constant', 'webnn/mlgraphbuilder#constant'],
  ['builder.build', 'webnn/mlgraphbuilder#build']
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
  ['WebNN Interfaces', 'browser-compatibility/api'],
  ['LiteRT Backend', 'browser-compatibility/litert'],
  ['DirectML Backend', 'browser-compatibility/directml'],
  ['Core ML Backend', 'browser-compatibility/coreml'],
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