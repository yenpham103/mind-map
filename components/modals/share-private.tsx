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
import { FaLock } from "react-icons/fa";
import { useSharePrivate } from "@/hooks/use-share-private";

const SharePrivate = () => {
  const privateModal = useSharePrivate();
  return (
    <AlertDialog open={privateModal.isOpen} onOpenChange={privateModal.onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Share Private <FaLock className="w-4 h-4 mb-[3px] " />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aut,
            ipsum quisquam modi porro architecto hic maxime, impedit .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SharePrivate;
