"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import { DeleteModal } from "@/components/modals/delete-modal";
import SharePublic from "@/components/modals/share-public";

interface BoardOptionsProps {
  id: string;
  title: string;
}
const BoardOptions = ({ id, title }: BoardOptionsProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-auto w-auto p-2 " variant="transparent">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
          <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Mind Mapping Actions
          </div>
          <PopoverClose>
            <Button
              variant="ghost"
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            >
              <X className="h-4 w-4 " />
            </Button>
          </PopoverClose>
          <SharePublic id={id} title={title}>
            <Button
              variant="ghost"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            >
              <MdOutlinePublic className="mr-2 w-4 h-4" />
              Share Public
            </Button>
          </SharePublic>

          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            // onClick={() => {
            //   privateModal.onOpen();
            // }}
          >
            <RiGitRepositoryPrivateFill className="mr-2 w-4 h-4" />
            Share Private
          </Button>

          <DeleteModal id={id}>
            <Button
              variant="ghost"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            >
              <MdDelete className="mr-2 w-4 h-4" />
              Delete Mindmap
            </Button>
          </DeleteModal>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default BoardOptions;
