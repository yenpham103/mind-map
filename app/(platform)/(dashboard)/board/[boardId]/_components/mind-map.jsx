"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "../styles/index.css";

import ResizableNodeSelected from "../helper/ResizableNodeSelected";
import TextUpdateNode from "../helper/TextUpdate";
const nodeTypes = { textUpdater: TextUpdateNode };

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "Mindmeister" },
    position: { x: 0, y: 50 },
    style: {
      border: "2px solid #ff0073",
      borderRadius: "8px",
      outLine: "none",
      boxShadow: "none",
    },
  },
];

const initialEdges = [];

const connectionLineStyle = {
  stroke: "#ff0073",
  strokeWidth: 2,
};

const defaultEdgeOptions = {
  style: connectionLineStyle,
  type: "default",
};

const MindMap = () => {
  const [selectedId, setSelected] = useState(false);

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { screenToFlowPosition } = useReactFlow();

  let id = 0;
  if (nodes?.length) {
    const ids = nodes.map((a) => a.id);
    id = Math.max(...ids) + 1;
  }

  const getId = useCallback(() => `${id++}`, [id]);

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Mindmeister ${id}` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition, setEdges, setNodes, getId]
  );

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Delete" && selectedId !== false && selectedId !== "0") {
        setNodes((nodes) => nodes.filter((node) => node.id !== selectedId));
        setEdges((edges) => edges.filter((edge) => edge.source !== selectedId));
      }
    });
  }, [selectedId, setNodes, setEdges]);
  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        fitView
        fitViewOptions={{ padding: 2, minZoom: 0.5 }}
        nodeOrigin={[0.5, 0]}
        onNodeClick={(_, { id }) => {
          setSelected(id);
        }}
        onEdgeClick={(_, { id }) => {
          setSelected(id);
        }}
      >
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === "input") return "green";
            return "#ff0073";
          }}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
