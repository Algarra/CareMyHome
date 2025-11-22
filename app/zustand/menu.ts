import { create } from "zustand";

export const useMenuStore = create<{
  menuOpen: boolean;
  blockOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  setBlockOpen: (value: boolean) => void;
}>((set, get) => ({
  menuOpen: false,
  blockOpen: false,
  setBlockOpen: (blockOpen: boolean) => set({ blockOpen }),
  setMenuOpen: (menuOpen: boolean) =>
    get().blockOpen
      ? set({ blockOpen: false })
      : set({
          menuOpen,
        }),
}));
