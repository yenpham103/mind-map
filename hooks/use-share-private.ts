import { create } from "zustand";

type SharePrivateProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useSharePrivate = create<SharePrivateProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
