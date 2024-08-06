import { Board } from "@prisma/client";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";
interface BoardNavbarProps {
  data: Board;
}
const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  console.log(data);

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-20 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} title={data.title} />
      </div>
    </div>
  );
};

export default BoardNavbar;
