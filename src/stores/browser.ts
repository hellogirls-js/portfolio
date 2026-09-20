import { create } from "zustand";

export const useBrowser = create<BrowserState>((set) => ({
  browserWindow: null,
  tabs: [],
  activeTabId: null,
  setBrowserWindow: (window) =>
    set((browser) => ({ ...browser, browserWindow: window })),
  clearBrowserWindow: () =>
    set((browser) => ({
      ...browser,
      tabs: [],
      activeTabId: null,
      browserWindow: null,
    })),
  addTab: (newTab) =>
    set((browser) => ({ ...browser, tabs: [...browser.tabs, newTab] })),
  closeTab: (tabToRemove) =>
    set((browser) => {
      const newTabs = [...browser.tabs].filter(
        (tab) => tab.openedAt !== tabToRemove.openedAt,
      );
      return { ...browser, tabs: newTabs };
    }),
  switchTab: (activeTab) =>
    set((browser) => ({ ...browser, activeTabId: activeTab })),
}));
