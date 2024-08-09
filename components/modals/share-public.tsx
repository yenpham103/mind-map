"use client";
import { updateBoard } from "@/actions/update-board";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAction } from "@/hooks/use-action";
import useOrigin from "@/hooks/use-origin";
import { useSharePublic } from "@/hooks/use-share-public";
import { Board } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  title: string;
  id: string;
};

interface SharePublicProps {
  data: Board;
}
const SharePublic = ({ data }: SharePublicProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();

  const publicModal = useSharePublic();
  const [title, setTitle] = useState(data.title);

  const { execute, isLoading } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Mindmeister "${data.title}" updated!`);
      setTitle(data.title);
      publicModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    execute({
      title: formData.title,
      id: data.id,
    });
    router.refresh();
  };

  //url
  const pathname = usePathname();
  const origin = useOrigin();
  const url = `${origin}${pathname}`;

  return (
    <Dialog open={publicModal.isOpen} onOpenChange={publicModal.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Mindmap Public</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="url" className="text-right">
              Liên kết chia sẻ
            </Label>
            <input
              id="url"
              {...register("url" as any)}
              defaultValue={url}
              className="flex-1  text-xs border rounded-l-md h-8 bg-muted truncate py-2 px-4 w-full"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="title" className="text-right">
              Tiêu đề
            </Label>
            <input
              id="title"
              {...register("title" as any)}
              className="flex-1  text-xs border rounded-l-md h-8 bg-muted truncate py-2 px-4 w-full"
              defaultValue={title}
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? "Sharing..." : "Share Public"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SharePublic;
