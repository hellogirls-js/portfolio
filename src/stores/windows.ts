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

			if (foundWindow < 0) return state;

			const newWindows = [...state.windows];
			newWindows[foundWindow].minimized = true;
			newWindows[foundWindow].maximized = false;
			return {
				...state,
				windows: newWindows,
				activeWindow: null,
			};
		}),
	maximizeWindow: (windowToMaximize) =>
		set((state) => {
			if (!windowToMaximize.shouldMaximize) return state;
			const foundWindow = state.windows.findIndex(
				(window) => window.openedAt === windowToMaximize.openedAt,
			);

			if (foundWindow < 0) return state;

			const newWindows = [...state.windows];
			newWindows[foundWindow].maximized = true;
			newWindows[foundWindow].minimized = false;
			return {
				...state,
				windows: newWindows,
				activeWindow: windowToMaximize,
			};
		}),
}));
