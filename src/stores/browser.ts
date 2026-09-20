import { create } from "zustand";

interface BrowserState {
  hideBrowser: boolean | null;
  tabs: IBrowserTab[];
  activeTabId: number | null;
  addTab: (newTab: IBrowserTab) => void;
  closeTab: (tabToRemove: IBrowserTab) => void;
  closeWindow: () => void;
  switchTab: (activeTab: number) => void;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
}

export const useBrowser = create<BrowserState>((set) => ({
  hideBrowser: null,
  tabs: [],
  activeTabId: null,
  addTab: (newTab) =>
    set((browser) => ({ ...browser, tabs: [...browser.tabs, newTab] })),
  closeTab: (tabToRemove) =>
    set((browser) => {
      const newTabs = [...browser.tabs].filter(
        (tab) => tab.openedAt !== tabToRemove.openedAt,
      );
      return { ...browser, tabs: newTabs };
    }),
  closeWindow: () =>
    set((browser) => ({
      ...browser,
      tabs: [],
      hideBrowser: null,
      activeTabId: null,
    })),
  minimizeWindow: () =>
    set((browser) => ({
      ...browser,
      hideBrowser: true,
    })),
  maximizeWindow: () => set((browser) => ({ ...browser, hideBrowser: false })),
  switchTab: (activeTab) =>
    set((browser) => ({ ...browser, activeTabId: activeTab })),
}));
