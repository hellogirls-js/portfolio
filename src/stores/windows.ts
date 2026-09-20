import { create } from "zustand";

export const useWindows = create<WindowsState>((set, get) => ({
  windows: [],
  activeWindow: null,
  setActiveWindow: (window) =>
    set((state) => ({ ...state, activeWindow: window })),
  createNewWindow: (newWindow) => {
    set((state) => ({
      ...state,
      windows: [...state.windows, newWindow],
    }));
    const newWindows = get().windows;
    return newWindows[newWindows.length - 1];
  },
  closeWindow: (windowToClose) =>
    set((state) => {
      const newWindows = [...state.windows].filter(
        (window) => window.openedAt !== windowToClose.openedAt,
      );
      return {
        ...state,
        windows: newWindows,
      };
    }),
  minimizeWindow: (windowToMinimize) =>
    set((state) => {
      const foundWindow = state.windows.findIndex(
        (window) => window.openedAt === windowToMinimize.openedAt,
      );
      const newWindows = [...state.windows];
      newWindows[foundWindow].minimized = true;
      return {
        ...state,
        windows: newWindows,
      };
    }),
  maximizeWindow: (windowToMaximize) =>
    set((state) => {
      if (!windowToMaximize.shouldMaximize) return state;
      const foundWindow = state.windows.findIndex(
        (window) => window.openedAt === windowToMaximize.openedAt,
      );
      const newWindows = [...state.windows];
      newWindows[foundWindow].maximized = true;
      return {
        ...state,
        windows: newWindows,
      };
    }),
}));
