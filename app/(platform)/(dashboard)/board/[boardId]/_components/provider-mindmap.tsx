"use client";

import { List } from "@prisma/client";
import MindMap from "./mind-map";
import { ReactFlowProvider } from "@xyflow/react";
interface ProviderMindmapProps {
  boardId: string;
  data: any;
}

const ProviderMindmap = ({ boardId, data }: ProviderMindmapProps) => {
  return (
    <ReactFlowProvider>
      <MindMap data={data} />
    </ReactFlowProvider>
  );
};

export default ProviderMindmap;
