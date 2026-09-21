import { useRouterState } from "@tanstack/react-router";
import clsx from "clsx";
import {
	useEffect,
	useRef,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from "react";
import StartMenuPages from "./StartMenuPages";
import StartMenuCredits from "./StartMenuCredits";

export default function StartMenu({
	openMenu,
	setOpenMenu,
	startButtonRef,
}: {
	openMenu: boolean;
	setOpenMenu: Dispatch<SetStateAction<boolean>>;
	startButtonRef: RefObject<HTMLButtonElement | null>;
}) {
	const startMenuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				startMenuRef.current &&
				startButtonRef.current &&
				!startMenuRef.current.contains(event.target as Node) &&
				!startButtonRef.current.contains(event.target as Node)
			) {
				setOpenMenu(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const router = useRouterState();

	useEffect(() => {
		setOpenMenu(false);
	}, [router.location]);

	return (
		<div
			id="start-menu-container"
			ref={startMenuRef}
			className={clsx(
				"absolute",
				"isolate",
				"z-4",
				"flex items-center gap-1",
				"bottom-12 left-2",
				"w-108 h-120",
				"p-2",
				"bg-linear-to-b from-primary-600/75 to-primary-700/75",
				"backdrop-blur-xs",
				"rounded-t-md",
				"border border-primary-400/50",
				"outline outline-primary-700",
				"shadow-lg/100",
				openMenu ? "block" : "hidden",
			)}
		>
			<div
				id="start-menu-avatar-container"
				className="absolute size-32 right-6 -top-1/10 flex items-center justify-center pointer-events-none select-none"
			>
				<img
					alt="profile avatar"
					src="https://assets.hellogirls.info/portfolio/assets/avatar.webp"
					className="size-22 backdrop-blur-xs"
				/>
				<img
					alt="frame"
					src="https://assets.hellogirls.info/portfolio/assets/frame.webp"
					className="absolute top-0 left-0 size-32 select-none pointer-events-none"
				/>
			</div>
			<StartMenuPages />
			<StartMenuCredits />
		</div>
	);
}
