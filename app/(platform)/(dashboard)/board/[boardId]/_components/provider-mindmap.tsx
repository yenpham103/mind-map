"use client";

import { List } from "@prisma/client";
import MindMap from "./mind-map";
import { ReactFlowProvider } from "@xyflow/react";
interface ProviderMindmapProps {
  boardId: string;
  data: List[];
}

const ProviderMindmap = ({ boardId, data }: ProviderMindmapProps) => {
  return (
    <ReactFlowProvider>
      <MindMap />
    </ReactFlowProvider>
  );
};

export default ProviderMindmap;
