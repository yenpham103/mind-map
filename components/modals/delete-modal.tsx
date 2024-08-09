"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";
import { toast } from "sonner";
import { deleteMindmap } from "@/services/mindmapService";

interface DeleteModalProps {
  id: string;
  children: React.ReactNode;
}

export const DeleteModal = ({ id, children }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDelete = async () => {
    try {
      await deleteMindmap(id as any);
      execute({ id });
      toast.success("Delete successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle>Delete Mind Mapping</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this mindmap? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancel
          </DialogClose>
          <Button
            onClick={onDelete}
            disabled={isLoading}
            variant="destructive"
            className="gradient-red w-full"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
