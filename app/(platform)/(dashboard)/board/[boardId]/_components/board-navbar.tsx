import { Board } from "@prisma/client";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";
import SharePublic from "@/components/modals/share-public";
interface BoardNavbarProps {
  data: Board;
}
const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-20 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <SharePublic data={data} />
        <BoardOptions id={data.id} title={data.title} data={data} />
      </div>
    </div>
  );
};

export default BoardNavbar;
