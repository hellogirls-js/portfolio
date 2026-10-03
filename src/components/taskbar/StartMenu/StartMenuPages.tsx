import clsx from "clsx";
import { useCallback } from "react";
import { useBrowser } from "@/stores/browser";
import { useWindows } from "@/stores/windows";
import { capitalizeFirstLetter } from "@/utils/functions";
import { START_MENU_LEFT_LINK } from "@/utils/styles";

function PageButton({ page }: { page: string }) {
	const { addTab, browserWindow, setBrowserWindow } = useBrowser();
	const { createNewWindow, maximizeWindow, setActiveWindow } = useWindows();

	const onPageClick = useCallback(() => {
		if (browserWindow) {
			addTab({ path: page, openedAt: Date.now() });
			setActiveWindow(browserWindow);
			maximizeWindow(browserWindow);
		} else {
			const windowDate = Date.now();
			const createdWindow = createNewWindow({
				title: "firefox",
				file: "firefox1.ico",
				openedAt: windowDate,
				shouldMaximize: true,
				maximized: true,
				minimized: false,
			});
			setBrowserWindow(createdWindow);
			setActiveWindow(createdWindow);
			addTab({ path: page, openedAt: Date.now() });
		}
	}, [browserWindow, createNewWindow, addTab]);

	return (
		<button
			type="button"
			className={clsx(
				START_MENU_LEFT_LINK,
				"text-left",
				"flex items-center gap-2",
			)}
			onClick={onPageClick}
		>
			<img
				src={`https://assets.hellogirls.info/portfolio/icons/${page}.ico`}
				alt={page}
				width={32}
				height={32}
			/>
			{capitalizeFirstLetter(page)}
		</button>
	);
}

export default function StartMenuPages() {
	const { createNewWindow, setActiveWindow } = useWindows();

	const onOpenChatbox = useCallback(() => {
		const chatboxWindow = createNewWindow({
			title: "chatbox",
			file: "chatbox.gif",
			openedAt: Date.now(),
			shouldMaximize: false,
			maximized: false,
			minimized: false,
		});

		setActiveWindow(chatboxWindow);
	}, [createNewWindow, setActiveWindow]);

	return (
		<div
			id="start-menu-left"
			className={clsx("flex flex-col gap-2", "h-full", "basis-3/5")}
		>
			<div
				id="start-menu-left-items"
				className={clsx(
					"flex flex-col",
					"bg-primary-50",
					"p-1",
					"gap-2",
					"basis-full",
					"rounded-sm",
					"inset-shadow-sm",
					"border border-primary-400/50",
					"select-none",
				)}
			>
				{["about", "work", "blog"].map((page) => (
					<PageButton key={page} {...{ page }} />
				))}
				<button
					type="button"
					className={clsx(
						START_MENU_LEFT_LINK,
						"text-left",
						"flex items-center gap-2",
					)}
					onClick={onOpenChatbox}
				>
					<img
						src={`https://assets.hellogirls.info/portfolio/icons/chatbox.ico`}
						alt={"chatbox"}
						width={32}
						height={32}
					/>
					Chatbox
				</button>
			</div>
			<input
				type="text"
				id="start-menu-left-search"
				placeholder="Start search..."
				className={clsx(
					"bg-primary-50",
					"h-7",
					"p-1",
					"placeholder:italic",
					"text-sm",
					"inset-shadow-sm",
					"border border-primary-400/50",
				)}
			/>
		</div>
	);
}
