import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "@xyflow/react";
import NetronNodeDot from "./node-dot";
import NetronNode0 from "./node-0";
import NetronNode1 from "./node-1";
import NetronNode2 from "./node-2";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "node0",
    type: "netronNodeDot",
    position: { x: 958, y: 30 },
  },
  {
    id: "node1",
    type: "netronNode2",
    position: { x: 900, y: 60 },
    data: {
      label: "LayerNormalization",
      n1: "Scale",
      n1_data: "<320>",
      n2: "B",
      n2_data: "<320>",
      labelClassName: "bg-[#f72585] text-white text-center",
    },
  },
  {
    id: "node2a",
    type: "netronNode1",
    position: { x: 760, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "node2b",
    type: "netronNode1",
    position: { x: 923, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "node2c",
    type: "netronNode1",
    position: { x: 1105, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "node3a",
    type: "netronNode1",
    position: { x: 767, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "node3b",
    type: "netronNode1",
    position: { x: 930, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "node3c",
    type: "netronNode1",
    position: { x: 1112, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "node4a",
    type: "netronNode0",
    position: { x: 763, y: 290 },
    data: {
      label: "Transpose",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "node4b",
    type: "netronNode0",
    position: { x: 926, y: 290 },
    data: {
      label: "Transpose",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "node5dot1",
    type: "netronNodeDot",
    position: { x: 722, y: 300 },
  },
  {
    id: "node5dot2",
    type: "netronNodeDot",
    position: { x: 885, y: 300 },
  },
  {
    id: "node5a",
    type: "netronNode0",
    position: { x: 782, y: 340 },
    data: {
      label: "Mul",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "node5b",
    type: "netronNode0",
    position: { x: 945, y: 340 },
    data: {
      label: "Mul",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "node6b",
    type: "netronNode0",
    position: { x: 935, y: 390 },
    data: {
      label: "MatMul",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
  {
    id: "node7b",
    type: "netronNode0",
    position: { x: 933, y: 440 },
    data: {
      label: "Softmax",
      labelClassName: "bg-[#eb6424] text-white l0 text-center",
    },
  },
  {
    id: "node7c",
    type: "netronNode0",
    position: { x: 1108, y: 440 },
    data: {
      label: "Transpose",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "node8",
    type: "netronNode0",
    position: { x: 935, y: 490 },
    data: {
      label: "MatMul",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
];

const initialEdges = [
  {
    id: "e0->21",
    source: "node0",
    target: "node1",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1->2a",
    source: "node1",
    target: "node2a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1->2b",
    source: "node1",
    target: "node2b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1->2c",
    source: "node1",
    target: "node2c",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e2a->3a",
    source: "node2a",
    target: "node3a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e2b->3b",
    source: "node2b",
    target: "node3b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e2c->3c",
    source: "node2c",
    target: "node3c",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3a->4a",
    source: "node3a",
    target: "node4a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3b->4b",
    source: "node3b",
    target: "node4b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4a->5a",
    source: "node4a",
    target: "node5a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4b->5b",
    source: "node4b",
    target: "node5b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5d1->5a",
    source: "node5dot1",
    target: "node5a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5d2->5a",
    source: "node5dot2",
    target: "node5b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5a->6b",
    source: "node5a",
    target: "node6b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5b->6b",
    source: "node5b",
    target: "node6b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e6b->7b",
    source: "node6b",
    target: "node7b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3c->7c",
    source: "node3c",
    target: "node7c",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e7b->8",
    source: "node7b",
    target: "node8",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e7c->8",
    source: "node7c",
    target: "node8",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
];

export default function Netron() {
  const nodeTypes = {
    netronNodeDot: NetronNodeDot,
    netronNode0: NetronNode0,
    netronNode1: NetronNode1,
    netronNode2: NetronNode2,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      className="px-5 hidden md:block md:px-20 py-12 mx-0 min-h-[50vh] md:min-h-[66vh]"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      {/* <Controls />
        <MiniMap /> */}
      <Background variant="dots" gap={20} size={1} color="#d1d1d1" />
    </ReactFlow>
  );
}
