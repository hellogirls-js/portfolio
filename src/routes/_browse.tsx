import {
	IconArrowLeft,
	IconDownload,
	IconHomeFilled,
	IconMenu2,
	IconSearch,
	IconStar,
} from "@tabler/icons-react";
import {
	createFileRoute,
	Outlet,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo } from "react";
import BrowserTab from "@/components/window/BrowserTab";
import WindowButtons from "@/components/window/WindowButtons";
import { useBrowser } from "@/stores/browser";
import { useWindows } from "@/stores/windows";

// TODO: for browser window
// use zustand to track tabs state

export const Route = createFileRoute("/_browse")({
	component: BrowserLayout,
});

function BrowserLayout() {
	const router = useRouterState();
	const navigate = useNavigate();
	const { tabs, browserWindow } = useBrowser();
	const { windows, closeWindow, activeWindow, setActiveWindow } = useWindows();

	const path = router.location.pathname.slice(1);

	const browserWindowInWindows = useMemo(() => {
		return windows.find(
			(window) => window.openedAt === browserWindow?.openedAt,
		);
	}, [windows, browserWindow]);

	const browserWindowIndex = useMemo(() => {
		return windows.findIndex(
			(window) => window.openedAt === browserWindow?.openedAt,
		);
	}, [windows, browserWindow]);

	useEffect(() => {
		if (!tabs.length) {
			if (browserWindow) {
				closeWindow(browserWindow);
			}
			navigate({ to: "/" });
		}
	}, [tabs]);

	const onWindowClick = useCallback(() => {
		if (activeWindow !== browserWindow) {
			setActiveWindow(browserWindow);
		}
	}, [activeWindow, setActiveWindow, browserWindow]);

	return (
		<motion.div
			onClick={onWindowClick}
			initial={{ scale: 0 }}
			animate={{ scale: browserWindowInWindows?.minimized ? 0 : 1 }}
			exit={{ scale: 0 }}
			transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
			style={{
				transformOrigin: `${2 * ((browserWindowIndex + 1) * 4)}% 100%`,
			}}
			className={clsx(
				"browser-window-container",
				"absolute",
				"top-0 left-0",
				"box-border",
				"w-full h-[calc(100vh-48px)] max-h-[calc(100vh-48px)]",
				"bg-browser-window",
				"backdrop-blur-sm",
				"px-2 pb-2",
				"z-3",
				"flex flex-col",
			)}
		>
			<WindowButtons />
			<div
				id="browser-tabs-address-container"
				className={clsx(
					"drop-shadow-[0px -8px 8px shadow-black/100]",
					"flex-col",
					"mt-1",
				)}
			>
				<div
					id="browser-tabs-container"
					className={clsx(
						"flex justify-start items-center",
						"w-full h-10",
						"pl-12",
						"overflow-hidden",
					)}
				>
					{tabs.map((tab, index) => (
						<BrowserTab {...{ tab, index }} key={tab.openedAt} />
					))}
				</div>
				<div
					id="browser-address-bar-container"
					className={clsx(
						"w-full",
						"h-16",
						"px-4 py-2",
						"bg-linear-to-b from-primary-100 to-primary-200",
						"rounded-tr-sm",
						"flex items-center justify-between gap-7",
						"border-l border-base-50",
						"border-b border-b-primary-400",
					)}
				>
					<div
						id="browser-address-left"
						className={clsx("flex items-center grow")}
					>
						<button
							type="button"
							className={clsx(
								"bg-linear-to-b from-primary-100 to-primary-200",
								"flex items-center justify-center",
								"text-center",
								"aspect-square h-full",
								"rounded-full",
								"border border-primary-300",
								"z-10",
							)}
						>
							<IconArrowLeft size={32} className={clsx("text-primary-300")} />
						</button>
						<div
							id="browser-address-bar"
							className={clsx(
								"flex items-center",
								"box-border",
								"text-sm text-base-400",
								"basis-full h-8",
								"py-2 pl-6 -ml-3",
								"bg-base-50",
								"border border-primary-300",
							)}
						>
							https://hellogirls.info/{path}
						</div>
					</div>
					<div
						id="browser-address-right"
						className={clsx("flex items-center", "basis-1/3 h-full gap-7")}
					>
						<div
							id="browser-search-container"
							className={clsx(
								"flex items-center gap-2",
								"box-border",
								"basis-full h-8",
								"py-2 px-2 ml-3",
								"bg-base-50",
								"border border-primary-300",
							)}
						>
							<IconSearch size={16} className="text-base-400" />
							<div
								id="browser-search-bar"
								className={clsx("italic", "text-sm text-base-400")}
							>
								Search
							</div>
						</div>
						<div
							id="browser-menu-buttons"
							className={clsx("flex items-center gap-7")}
						>
							<button type="button">
								<IconStar className={clsx("text-primary-700")} />
							</button>
							<IconDownload className="text-primary-700" />
							<IconHomeFilled className="text-primary-700" />
							<div className="box-border w-px h-3/4 bg-primary-300/60 py-2" />
							<IconMenu2 className="text-primary-700" />
						</div>
					</div>
				</div>
			</div>
			<div className="browser-content w-full h-full max-h-full overflow-y-hidden bg-base-50 rounded-b-sm shadow-2xl shadow-black/10">
				<Outlet />
			</div>
		</motion.div>
	);
}
