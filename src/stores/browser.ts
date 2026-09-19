import { create } from "zustand";

interface BrowserState {
  tabs: string[];
  addTab: (newTab: string) => void;
  removeTab: (index: number) => void;
  closeWindow: () => void;
}

export const useBrowser = create<BrowserState>((set) => ({
  tabs: [],
  addTab: (newTab) => set((browser) => ({ tabs: [...browser.tabs, newTab] })),
  removeTab: (index) =>
    set((browser) => {
      const newTabs = browser.tabs.splice(index, 1);
      return { tabs: newTabs };
    }),
  closeWindow: () => set(() => ({ tabs: [] })),
}));
