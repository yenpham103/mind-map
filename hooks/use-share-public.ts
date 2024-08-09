import { create } from "zustand";

type SharePublicProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useSharePublic = create<SharePublicProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
