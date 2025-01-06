import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  reconnectEdge,
  Background,
  Controls
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
    position: { x: 0, y: 0 },
    data: {
      nodeClassName: "netron dot translate-x-[175px] sm:translate-x-[319px] md:translate-x-[568px] lg:translate-x-[758px] xl:translate-x-[958px] 2xl:translate-x-[1158px] translate-y-[30px]",
    }
  },
  {
    id: "node1",
    type: "netronNode2",
    position: { x: 0, y: 0 },
    data: {
      label: "LayerNormalization",
      n1: "Scale",
      n1_data: "<320>",
      n2: "B",
      n2_data: "<320>",
      nodeClassName: "netron translate-x-[117px] sm:translate-x-[261px] md:translate-x-[510px] lg:translate-x-[700px] xl:translate-x-[900px] 2xl:translate-x-[1100px] translate-y-[60px]",
      labelClassName: "bg-[#f72585] text-white text-center",
    },
  },
  {
    id: "node2a",
    type: "netronNode1",
    position: { x: 0, y: 0 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName: "netron translate-x-[24px] sm:translate-x-[84px] md:translate-x-[392px] lg:translate-x-[560px] xl:translate-x-[760px] 2xl:translate-x-[960px] translate-y-[150px]",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "node2b",
    type: "netronNode1",
    position: { x: 0, y: 0 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName: "netron translate-x-[140px] sm:translate-x-[284px] md:translate-x-[533px] lg:translate-x-[723px] xl:translate-x-[923px] 2xl:translate-x-[1123px] translate-y-[150px]",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "node2c",
    type: "netronNode1",
    position: { x: 0, y: 0 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName: "netron translate-x-[258px] sm:translate-x-[484px] md:translate-x-[676px] lg:translate-x-[887px] xl:translate-x-[1087px] 2xl:translate-x-[1287px] translate-y-[150px]",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "node3a",
    type: "netronNode1",
    position: { x: 0, y: 0 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName: "netron translate-x-[31px] sm:translate-x-[91px] md:translate-x-[399px] lg:translate-x-[567px] xl:translate-x-[767px] 2xl:translate-x-[967px] translate-y-[220px]",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "node3b",
    type: "netronNode1",
    position: { x: 0, y: 0 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName: "netron translate-x-[147px] sm:translate-x-[291px] md:translate-x-[540px] lg:translate-x-[730px] xl:translate-x-[930px] 2xl:translate-x-[1130px] translate-y-[220px]",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "node3c",
    type: "netronNode1",
    position: { x: 0, y: 0 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName: "netron translate-x-[265px] sm:translate-x-[491px] md:translate-x-[683px] lg:translate-x-[894px] xl:translate-x-[1094px] 2xl:translate-x-[1294px] translate-y-[220px]",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "node4a",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Transpose",
      nodeClassName: "netron translate-x-[27px] sm:translate-x-[87px] md:translate-x-[395px] lg:translate-x-[563px] xl:translate-x-[763px] 2xl:translate-x-[963px] translate-y-[290px]",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "node4b",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Transpose",
      nodeClassName: "netron translate-x-[143px] sm:translate-x-[287px] md:translate-x-[536px] lg:translate-x-[726px] xl:translate-x-[926px] 2xl:translate-x-[1126px] translate-y-[290px]",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "node5dot1",
    type: "netronNodeDot",
    position: { x: 0, y: 0 },
    data: {
      nodeClassName: "netron dot translate-x-[11px] sm:translate-x-[20px] md:translate-x-[355px] lg:translate-x-[514px] xl:translate-x-[714px] 2xl:translate-x-[914px] translate-y-[300px]",
    }
  },
  {
    id: "node5dot2",
    type: "netronNodeDot",
    position: { x: 0, y: 0 },
    data: {
      nodeClassName: "netron dot translate-x-[127px] sm:translate-x-[220px] md:translate-x-[496px] lg:translate-x-[677px] xl:translate-x-[877px] 2xl:translate-x-[1077px] translate-y-[300px]",
    }
  },
  {
    id: "node5a",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Mul",
      nodeClassName: "netron translate-x-[46px] sm:translate-x-[106px] md:translate-x-[414px] lg:translate-x-[582px] xl:translate-x-[782px] 2xl:translate-x-[982px] translate-y-[340px]",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "node5b",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Mul",
      nodeClassName: "netron translate-x-[162px] sm:translate-x-[306px] md:translate-x-[555px] lg:translate-x-[745px] xl:translate-x-[945px] 2xl:translate-x-[1145px] translate-y-[340px]",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "node6b",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "MatMul",
      nodeClassName: "netron translate-x-[92px] sm:translate-x-[194px] md:translate-x-[544px] lg:translate-x-[652px] xl:translate-x-[852px] 2xl:translate-x-[1052px] translate-y-[390px]",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
  {
    id: "node7b",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Softmax",
      nodeClassName: "netron translate-x-[90px] sm:translate-x-[192px] md:translate-x-[543px] lg:translate-x-[650px] xl:translate-x-[850px] 2xl:translate-x-[1050px] translate-y-[440px]",
      labelClassName: "bg-[#eb6424] text-white l0 text-center",
    },
  },
  {
    id: "node7c",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Transpose",
      nodeClassName: "netron translate-x-[262px] sm:translate-x-[487px] md:translate-x-[680px] lg:translate-x-[890px] xl:translate-x-[1090px] 2xl:translate-x-[1290px] translate-y-[440px]",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "node8",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "MatMul",
      nodeClassName: "netron translate-x-[151px] sm:translate-x-[295px] md:translate-x-[613px] lg:translate-x-[735px] xl:translate-x-[935px] 2xl:translate-x-[1135px] translate-y-[490px]",
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

  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  // const onReconnect = useCallback((oldEdge, newConnection) => {
  //   setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      // setNodes((nodes) => [...nodes]);
      setEdges((edges) => [...edges]);
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setEdges]);

  return (
    <ReactFlow
      className="px-5 md:block md:px-20 my-0 py-0 md:py-0 mx-0 !h-[550px]"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      // onReconnect={onReconnect}
      nodeTypes={nodeTypes}
    >
      {/* <Controls />
        <MiniMap /> */}
      <Background variant="dots" gap={20} size={1} color="#d1d1d1" />
    </ReactFlow>
  );
}
