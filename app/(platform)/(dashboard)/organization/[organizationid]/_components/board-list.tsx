import { FormPopover } from "@/components/form/form-popover";
import { db } from "@/lib/db";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //
  return (
    <div className="space-y-4 ">
      <div className="flex items-center font-semibold text=lg text-neutral-700">
        <User2 className="w-6 h-6 mr-2" />
        Your Mindmap
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex - flex-col gap-y-1 items-center justify-center hover:opacity-75 transition "
          >
            <p className="text-sm">Create new mindmap</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
