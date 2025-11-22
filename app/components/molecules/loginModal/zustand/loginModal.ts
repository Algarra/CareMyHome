import { create } from "zustand";

export const useLoginModalStore = create<{
  loginModalOpen: boolean;
  setLoginModalOpen: (value: boolean) => void;
}>((set) => ({
  loginModalOpen: false,
  setLoginModalOpen: (value: boolean) => {
    set(() => ({
      loginModalOpen: value,
    }));
  },
}));
