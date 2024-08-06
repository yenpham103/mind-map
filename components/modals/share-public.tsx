"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOrigin from "@/hooks/use-origin";
import { usePathname } from "next/navigation";

interface SharePublicProps {
  children: React.ReactNode;
  id: string;
  title: string;
}
const SharePublic = ({ id, title, children }: SharePublicProps) => {
  //url
  const pathname = usePathname();
  const origin = useOrigin();
  const url = `${origin}${pathname}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Mindmap Public</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Liên kết chia sẻ
            </Label>
            <Input id="name" defaultValue={url} className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Tiêu đề
            </Label>
            <Input id="username" defaultValue={title} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SharePublic;
