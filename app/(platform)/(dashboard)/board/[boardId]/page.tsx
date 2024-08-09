import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProviderMindmap from "./_components/provider-mindmap";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
  });

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return (
    <>
      <ProviderMindmap boardId={params.boardId} data={board} />
    </>
  );
};

export default BoardIdPage;
