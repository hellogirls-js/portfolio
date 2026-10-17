import { create } from "zustand";

export const useWindows = create<WindowsState>((set, get) => ({
  windows: new Map<string, IWindow>(),
  activeWindow: null,
  setActiveWindow: (window) =>
    set((state) => {
      if (window !== null) {
        const theWindow = state.windows.get(window.title)!;
        const updatedWindows = new Map(state.windows);
        theWindow.minimized = false;
        updatedWindows.set(theWindow.title, theWindow);
        return {
          ...state,
          activeWindow: window,
          windows: updatedWindows,
        };
      }
      return { ...state, activeWindow: window };
    }),
  createNewWindow: (newWindow) => {
    set((state) => {
      const isWindowAlreadyAdded = state.windows.has(newWindow.title);
      if (isWindowAlreadyAdded) return state;
      const updatedWindows = new Map(state.windows);
      updatedWindows.set(newWindow.title, newWindow);
      return {
        ...state,
        windows: updatedWindows,
      };
    });
    const newWindows = get().windows;
    return newWindows.get(newWindow.title)!;
  },
  closeWindow: (windowToClose) =>
    set((state) => {
      const updatedWindows = new Map(state.windows);
      updatedWindows.delete(windowToClose.title);
      return {
        ...state,
        windows: updatedWindows,
        activeWindow: null,
      };
    }),
  showWindow: (windowToShow) =>
    set((state) => {
      const foundWindow = state.windows.get(windowToShow.title);
      if (!foundWindow) return state;

      foundWindow.minimized = false;
      const updatedWindows = new Map(state.windows);
      updatedWindows.set(windowToShow.title, foundWindow);
      return {
        ...state,
        windows: updatedWindows,
        activeWindow: windowToShow,
      };
    }),
  minimizeWindow: (windowToMinimize) =>
    set((state) => {
      const foundWindow = state.windows.get(windowToMinimize.title);

      if (!foundWindow) return state;

      foundWindow.maximized = false;
      foundWindow.minimized = true;

      const updatedWindows = new Map(state.windows);

      updatedWindows.set(windowToMinimize.title, foundWindow);

      return {
        ...state,
        windows: updatedWindows,
        activeWindow: null,
      };
    }),
  maximizeWindow: (windowToMaximize) =>
    set((state) => {
      const foundWindow = state.windows.get(windowToMaximize.title);

      if (!foundWindow) return state;

      foundWindow.maximized = true;
      foundWindow.minimized = false;

      const updatedWindows = new Map(state.windows);

      updatedWindows.set(windowToMaximize.title, foundWindow);

      return {
        ...state,
        windows: updatedWindows,
        activeWindow: windowToMaximize,
      };
    }),
}));
