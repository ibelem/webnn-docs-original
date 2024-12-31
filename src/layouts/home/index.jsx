import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "@xyflow/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BoltIcon, SparklesIcon } from "@heroicons/react/24/outline";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 900, y: 50 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "2",
    position: { x: 900, y: 120 },
    data: { label: "Concat" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "3-3",
    position: { x: 910, y: 200 },
    data: { label: "Scaled Dot-Product Attention" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "3-2",
    position: { x: 905, y: 195 },
    data: { label: "Scaled Dot-Product Attention" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "3",
    position: { x: 900, y: 190 },
    data: { label: "Scaled Dot-Product Attention" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "4-3",
    position: { x: 710, y: 290 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "4-2",
    position: { x: 705, y: 285 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "4",
    position: { x: 700, y: 280 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "5-3",
    position: { x: 910, y: 290 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "5-2",
    position: { x: 905, y: 285 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "5",
    position: { x: 900, y: 280 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "6-3",
    position: { x: 1110, y: 290 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "6-2",
    position: { x: 1105, y: 285 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "6",
    position: { x: 1100, y: 280 },
    data: { label: "Linear" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "7",
    position: { x: 700, y: 360 },
    data: { label: "V" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "8",
    position: { x: 900, y: 360 },
    data: { label: "K" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
  {
    id: "9",
    position: { x: 1100, y: 360 },
    data: { label: "Q" },
    style: {
      fontWeight: "bold",
      border: "1px solid var(--light)",
      borderRadius: "5px",
      color: "var(--light)",
    },
  },
];
const initialEdges = [{ id: 'e3-2',
  source: '3',
  target: '2',
  type: 'default',
  animated: true,
  style: {
    strokeDasharray: 5,
    stroke: 'pink'
  },
  markerEnd: {
    type: 'arrow',
    color: 'pink',
    width: 20,
    height: 20
  }
} ];

export default function Home() {
  const router = useRouter();
  let locale = "en";
  if (router.route.indexOf("/en")) {
    locale = "en";
  }
  if (router.route.indexOf("/zh")) {
    locale = "zh";
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      className="px-5 md:px-20 py-8 mx-0"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <div className="w-full md:w-1/3 px-0 py-2 md:py-12 h-2/6 items-center justify-items-base">
        <h1 className="font-title tracking-[-0.02rem] text-4xl lg:text-5xl mb-4 font-black">
          WebNN: Neural Network Acceleration for the Web
        </h1>
        <div>
          Web Neural Network API, a new web standard will play a pivotal role in
          the future of web development by enabling seamless integration of
          artificial intelligence (AI) directly within web browsers, allowing
          for faster, more efficient AI-powered applications on user devices.
        </div>
        <div className="my-8">
          <Link
            href="/learn/quickstart"
            locale={locale}
            className="button-highlight px-4 md:px-6 py-2 md:py-3"
          >
            <BoltIcon className="w-5 h-5 mr-1 inline-flex" /> Quickstart
          </Link>
          <Link
            href="/api-reference/reference"
            locale={locale}
            className="button-outline ml-4 px-4 md:px-6 py-2 md:py-3"
          >
            <SparklesIcon className="w-5 h-5 mr-1 inline-flex" /> API Reference
          </Link>
        </div>
      </div>

      {/* <Controls />
        <MiniMap /> */}
      <Background variant="dots" gap={20} size={1} color="#a1a1a1" />
    </ReactFlow>
  );
}
