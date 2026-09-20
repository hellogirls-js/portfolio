interface BrowserState {
  browserWindow: IWindow | null;
  tabs: IBrowserTab[];
  activeTabId: number | null;
  clearBrowserWindow: () => void;
  setBrowserWindow: (window: IWindow) => void;
  addTab: (newTab: IBrowserTab) => void;
  closeTab: (tabToRemove: IBrowserTab) => void;
  switchTab: (activeTab: number) => void;
}

interface WindowsState {
  windows: IWindow[];
  activeWindow: IWindow | null;
  setActiveWindow: (window: IWindow | null) => void;
  createNewWindow: (newWindow: IWindow) => IWindow;
  closeWindow: (windowToClose: IWindow) => void;
  minimizeWindow: (windowToMinimize: IWindow) => void;
  maximizeWindow: (windowToMazimize: IWindow) => void;
}
