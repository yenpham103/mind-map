"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ActivityModalProps {
  orgId: string | undefined;
}
const ActivityModal = ({ orgId }: ActivityModalProps) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleBackBoard = () => {
    router.push(`/organization/${orgId}`);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Activity !
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tính năng này đang phát triển, phiền bạn quay trở lại sau !!!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleBackBoard}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActivityModal;
