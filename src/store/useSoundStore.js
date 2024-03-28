import { create } from "zustand";

export const useSoundStore = create((set) => ({
  currentTrack: "",
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
}));
