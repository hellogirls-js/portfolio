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
			let newActiveTab = browser.activeTabId;
			let newBrowserWindow = browser.browserWindow;
			const tabIndex = browser.tabs.findIndex(
				(tab) => tab.openedAt === tabToRemove.openedAt,
			);
			if (tabToRemove.openedAt === browser.activeTabId) {
				// if the closed tab is the active tab, replace it
				if (browser.tabs.length <= 1) {
					newActiveTab = null;
					newBrowserWindow = null;
				} else if (tabIndex === 0) {
					newActiveTab = browser.tabs[tabIndex + 1].openedAt;
				} else {
					newActiveTab = browser.tabs[tabIndex - 1].openedAt;
				}
			}
			const newTabs = [...browser.tabs].filter(
				(tab) => tab.openedAt !== tabToRemove.openedAt,
			);
			return {
				...browser,
				tabs: newTabs,
				activeTabId: newActiveTab,
				browserWindow: newBrowserWindow,
			};
		}),
	switchTab: (activeTab) =>
		set((browser) => ({ ...browser, activeTabId: activeTab })),
}));
