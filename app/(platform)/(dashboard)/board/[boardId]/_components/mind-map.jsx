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
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "../styles/index.css";

import TextUpdateNode from "../helper/TextUpdate";
import {
  getMindmap,
  postMindmap,
  updatedMindMap,
} from "@/services/mindmapService";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { DeleteModal } from "@/components/modals/delete-modal";

const nodeTypes = { textUpdater: TextUpdateNode };

const connectionLineStyle = {
  stroke: "#ff0073",
  strokeWidth: 2,
};

const MindMap = ({ data }) => {
  const [selectedId, setSelected] = useState(false);
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dataMindMap, setDataMindMap] = useState({});
  const [nextId, setNextId] = useState(0);
  const [updateMindMap, setUpdateMindMap] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const { boardId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMindmap(boardId);
      if (data && data.nodes) {
        setNodes(data.nodes);
        setEdges(data.edges || []);
        setNextId(
          data.nodes.length
            ? Math.max(...data.nodes.map((n) => parseInt(n.id, 10))) + 1
            : 0
        );
        setUpdateMindMap(true);
      } else {
        setNodes([]);
        setEdges([]);
        setNextId(0);
      }
    };
    fetchData();
  }, [boardId, setNodes, setEdges]);

  const { screenToFlowPosition } = useReactFlow();

  const getId = useCallback(() => {
    const id = nextId;
    setNextId(nextId + 1);
    return id.toString();
  }, [nextId]);

  const onConnect = useCallback(
    (params) => {
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
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Mindmap ${id}` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) =>
          eds.concat({
            id: `${connectingNodeId.current}-${id}`,
            source: connectingNodeId.current,
            target: id,
          })
        );
        setDataMindMap({
          id: boardId,
          title: data.title || "Untitled",
          nodes: [...nodes, newNode],
          edges: [...edges],
        });
      }
    },
    [
      screenToFlowPosition,
      setEdges,
      setNodes,
      getId,
      nodes,
      dataMindMap,
      boardId,
      edges,
    ]
  );

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Delete" && selectedId !== false && selectedId !== "0") {
        setNodes((nodes) => nodes.filter((node) => node.id !== selectedId));
        setEdges((edges) =>
          edges.filter(
            (edge) => edge.source !== selectedId && edge.target !== selectedId
          )
        );
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [selectedId, setNodes, setEdges]);

  //Call Api
  //Create Mindmap
  const handleCreateMindMap = () => {
    const newNode = {
      id: getId(),
      position: { x: 0, y: 50 },
      data: { label: "Base" },
      origin: [0.5, 0.0],
      type: "textUpdater",
    };
    setNodes([newNode]);
    setEdges([]);
  };

  // Handle POST Mindmap
  const handlePostMindMap = async () => {
    setLoadingPost(true);
    try {
      const newMindmapData = {
        id: boardId,
        nodes,
        edges,
        title: dataMindMap.title || "Untitled",
      };
      await postMindmap(newMindmapData);
      toast.success("Mindmap created successfully");
      setUpdateMindMap(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingPost(false);
    }
  };

  //Handle Update Mindmap
  const handleUpdateMindMap = async () => {
    setLoadingUpdate(true);
    try {
      const newMindmapData = {
        nodes,
        edges,
        title: dataMindMap.title || "Untitled",
      };
      await updatedMindMap(boardId, newMindmapData);
      toast.success("Mindmap updated successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

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
        defaultEdgeOptions={{ style: connectionLineStyle, type: "default" }}
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
        <div className="flex">
          {nodes.length !== 0 ? (
            <>
              <Panel
                className="panel-btn transition absolute top-0 bg-[#ff0073] hover:bg-[#ff0073]/10 text-white rounded-md"
                position="top-right"
              >
                {!updateMindMap ? (
                  <button onClick={handlePostMindMap} className="py-2 px-6">
                    {loadingPost ? "Creating Mind Map" : "Create Mind Map"}
                  </button>
                ) : (
                  <button onClick={handleUpdateMindMap} className="py-2 px-6">
                    {loadingUpdate ? "Updating Mind Map" : "Update Mind Map"}
                  </button>
                )}
              </Panel>
              <DeleteModal id={boardId}>
                <Panel className="panel-btn transition absolute  top-0 bg-[#ff0073] hover:bg-[#ff0073]/90 text-white rounded-md">
                  <button className="py-2 px-6">Delete Mind Map</button>
                </Panel>
              </DeleteModal>
            </>
          ) : (
            <Panel className="panel-btn transition absolute top-0 bg-[#ff0073] hover:bg-[#ff0073]/90 text-white rounded-md">
              <button onClick={handleCreateMindMap} className="py-2 px-6">
                Add Mind Map
              </button>
            </Panel>
          )}
        </div>
      </ReactFlow>
    </div>
  );
};

export default MindMap;
