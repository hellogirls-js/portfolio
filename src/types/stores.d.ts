interface BrowserState {
	browserWindow: IWindow | null;
	tabs: IBrowserTab[];
	activeTabId: number | null;
	clearBrowserWindow: () => void;
	setBrowserWindow: (window: IWindow) => void;
	openBrowserWindow: () => IWindow;
	addTab: (newTab: IBrowserTab) => void;
	setTabPath: (tabId: number, path: string) => void;
	closeTab: (tabToRemove: IBrowserTab) => void;
	switchTab: (activeTab: number) => void;
}

interface WindowsState {
	windows: Map<string, IWindow>;
	activeWindow: IWindow | null;
	setActiveWindow: (window: IWindow | null) => void;
	createNewWindow: (newWindow: IWindow) => IWindow;
	closeWindow: (windowToClose: IWindow) => void;
	minimizeWindow: (windowToMinimize: IWindow) => void;
	maximizeWindow: (windowToMazimize: IWindow) => void;
	showWindow: (windowToShow: IWindow) => void;
}
