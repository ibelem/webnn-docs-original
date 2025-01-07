import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  reconnectEdge,
  Background,
  Controls,
} from "@xyflow/react";
import NetronNodeDot from "./node-dot";
import NetronNode0 from "./node-0";
import NetronNode1 from "./node-1";
import NetronNode2 from "./node-2";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "n0",
    type: "netronNodeDot",
    position: { x: 175, y: 30 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
  {
    id: "n1",
    type: "netronNode2",
    position: { x: 117, y: 60 },
    data: {
      label: "LayerNormalization",
      n1: "Scale",
      n1_data: "<320>",
      n2: "B",
      n2_data: "<320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#f72585] text-white text-center",
    },
  },
  {
    id: "n2a",
    type: "netronNode1",
    position: { x: 24, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "n2b",
    type: "netronNode1",
    position: { x: 140, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "n2c",
    type: "netronNode1",
    position: { x: 258, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "n3a",
    type: "netronNode1",
    position: { x: 31, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "n3b",
    type: "netronNode1",
    position: { x: 147, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "n3c",
    type: "netronNode1",
    position: { x: 265, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "n4a",
    type: "netronNode0",
    position: { x: 27, y: 290 },
    data: {
      label: "Transpose",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "n4b",
    type: "netronNode0",
    position: { x: 143, y: 290 },
    data: {
      label: "Transpose",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "n5d1",
    type: "netronNodeDot",
    position: { x: 11, y: 300 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
  {
    id: "n5d2",
    type: "netronNodeDot",
    position: { x: 127, y: 300 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
  {
    id: "n5a",
    type: "netronNode0",
    position: { x: 46, y: 340 },
    data: {
      label: "Mul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "n5b",
    type: "netronNode0",
    position: { x: 162, y: 340 },
    data: {
      label: "Mul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "n6b",
    type: "netronNode0",
    position: { x: 92, y: 390 },
    data: {
      label: "MatMul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
  {
    id: "n7b",
    type: "netronNode0",
    position: { x: 90, y: 440 },
    data: {
      label: "Softmax",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#eb6424] text-white l0 text-center",
    },
  },
  {
    id: "n7c",
    type: "netronNode0",
    position: { x: 262, y: 440 },
    data: {
      label: "Transpose",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "n8",
    type: "netronNode0",
    position: { x: 151, y: 490 },
    data: {
      label: "MatMul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
];

const nodesPosition = {
  mobile: {
    n0: 175,
    n1: 117,
    n2a: 24,
    n2b: 140,
    n2c: 258,
    n3a: 31,
    n3b: 147,
    n3c: 265,
    n4a: 27,
    n4b: 143,
    n5d1: 11,
    n5d2: 127,
    n5a: 46,
    n5b: 162,
    n6b: 92,
    n7b: 90,
    n7c: 262,
    n8: 151,
  },
  sm: {
    n0: 319,
    n1: 261,
    n2a: 84,
    n2b: 284,
    n2c: 484,
    n3a: 91,
    n3b: 291,
    n3c: 491,
    n4a: 87,
    n4b: 287,
    n5d1: 20,
    n5d2: 220,
    n5a: 106,
    n5b: 306,
    n6b: 194,
    n7b: 192,
    n7c: 487,
    n8: 295,
  },
  md: {
    n0: 568,
    n1: 510,
    n2a: 392,
    n2b: 533,
    n2c: 676,
    n3a: 399,
    n3b: 540,
    n3c: 683,
    n4a: 395,
    n4b: 536,
    n5d1: 355,
    n5d2: 496,
    n5a: 414,
    n5b: 555,
    n6b: 544,
    n7b: 543,
    n7c: 680,
    n8: 613,
  },
  lg: {
    n0: 758,
    n1: 700,
    n2a: 560,
    n2b: 723,
    n2c: 887,
    n3a: 567,
    n3b: 730,
    n3c: 894,
    n4a: 563,
    n4b: 726,
    n5d1: 514,
    n5d2: 677,
    n5a: 582,
    n5b: 745,
    n6b: 652,
    n7b: 650,
    n7c: 890,
    n8: 735,
  },
  xl: {
    n0: 958,
    n1: 900,
    n2a: 760,
    n2b: 923,
    n2c: 1087,
    n3a: 767,
    n3b: 930,
    n3c: 1094,
    n4a: 763,
    n4b: 926,
    n5d1: 714,
    n5d2: 877,
    n5a: 782,
    n5b: 945,
    n6b: 852,
    n7b: 850,
    n7c: 1090,
    n8: 935,
  },
  "2xl": {
    n0: 1158,
    n1: 1100,
    n2a: 960,
    n2b: 1123,
    n2c: 1287,
    n3a: 967,
    n3b: 1130,
    n3c: 1294,
    n4a: 963,
    n4b: 1126,
    n5d1: 914,
    n5d2: 1077,
    n5a: 982,
    n5b: 1145,
    n6b: 1052,
    n7b: 1050,
    n7c: 1290,
    n8: 1135,
  },
};

const initialEdges = [
  {
    id: "e0_1",
    source: "n0",
    target: "n1",
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
    id: "e1_2a",
    source: "n1",
    target: "n2a",
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
    id: "e1_2b",
    source: "n1",
    target: "n2b",
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
    id: "e1_2c",
    source: "n1",
    target: "n2c",
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
    id: "e2a_3a",
    source: "n2a",
    target: "n3a",
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
    id: "e2b_3b",
    source: "n2b",
    target: "n3b",
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
    id: "e2c_3c",
    source: "n2c",
    target: "n3c",
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
    id: "e3a_4a",
    source: "n3a",
    target: "n4a",
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
    id: "e3b_4b",
    source: "n3b",
    target: "n4b",
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
    id: "e4a_5a",
    source: "n4a",
    target: "n5a",
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
    id: "e4b_5b",
    source: "n4b",
    target: "n5b",
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
    id: "e5d1_5a",
    source: "n5d1",
    target: "n5a",
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
    id: "e5d2_5a",
    source: "n5d2",
    target: "n5b",
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
    id: "e5a_6b",
    source: "n5a",
    target: "n6b",
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
    id: "e5b_6b",
    source: "n5b",
    target: "n6b",
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
    id: "e6b_7b",
    source: "n6b",
    target: "n7b",
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
    id: "e3c_7c",
    source: "n3c",
    target: "n7c",
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
    id: "e7b_8",
    source: "n7b",
    target: "n8",
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
    id: "e7c_8",
    source: "n7c",
    target: "n8",
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

  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  // const onReconnect = useCallback((oldEdge, newConnection) => {
  //   setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      fitView();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setEdges]);

  return (
    <ReactFlow
      className="px-5 xl:col-span-3 md:px-20 my-0 py-0 md:py-0 mx-0 !h-[550px]"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      // onReconnect={onReconnect}
      nodeTypes={nodeTypes}
      fitView
    >
      { 
        /* <Controls /> <MiniMap /> */}
      {/* <Background variant="dots" gap={20} size={1} color="#d1d1d1" /> */}
    </ReactFlow>
  );
}
