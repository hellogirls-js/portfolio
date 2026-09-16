import { START_MENU_LEFT_LINK, START_MENU_RIGHT_LINK } from "@/utils/styles";
import {
	IconChevronRightFilled,
	IconLockFilled,
	IconPower,
} from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import clsx from "clsx";
import {
	useEffect,
	useRef,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from "react";

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
				"z-100",
				"flex items-center gap-2",
				"bottom-12 -left-4",
				"w-108 h-120",
				"p-2",
				"bg-linear-to-b from-primary-600/75 to-primary-700/75",
				"backdrop-blur-sm",
				"rounded-t-md",
				"border border-primary-400/50",
				"outline outline-primary-700",
				"shadow-lg/100",
				openMenu ? "block" : "hidden",
			)}
		>
			<div
				id="start-menu-avatar-container"
				className="absolute size-32 right-6 -top-1/10 flex items-center justify-center pointer-none select-none"
			>
				<img
					alt="profile avatar"
					src="https://assets.hellogirls.info/portfolio/assets/avatar.webp"
					className="size-22"
				/>
				<img
					alt="frame"
					src="https://assets.hellogirls.info/portfolio/assets/frame.webp"
					className="absolute top-0 left-0 size-32"
				/>
			</div>
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
					)}
				>
					<Link className={clsx(START_MENU_LEFT_LINK)} to="/about">
						About
					</Link>
					<Link className={clsx(START_MENU_LEFT_LINK)} to="/work">
						Work
					</Link>
					<Link
						className={clsx(START_MENU_LEFT_LINK)}
						to="/blog"
						params={{ postSlug: "" }}
					>
						Blog
					</Link>
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
			<div
				id="start-menu-right"
				className={clsx("flex flex-col gap-2", "h-full", "basis-2/5")}
			>
				<div
					id="start-menu-right-items"
					className={clsx(
						"basis-full",
						"flex flex-col gap-4",
						"px-1 py-2",
						"mt-20",
					)}
				>
					<a
						className={START_MENU_RIGHT_LINK}
						href="https://bun.sh"
						target="_blank"
						rel="noopener"
					>
						Bun
					</a>
					<a
						className={START_MENU_RIGHT_LINK}
						href="https://react.dev"
						target="_blank"
						rel="noopener"
					>
						React
					</a>
					<a
						className={START_MENU_RIGHT_LINK}
						href="https://tailwindcss.com"
						target="_blank"
						rel="noopener"
					>
						Tailwind
					</a>
					<a
						className={START_MENU_RIGHT_LINK}
						href="https://tanstack.com/router/latest"
						target="_blank"
						rel="noopener"
					>
						Tanstack Router
					</a>
					<div className="box-content h-px w-full border-b border-b-primary-400 bg-black" />
					<a
						className={START_MENU_RIGHT_LINK}
						href="https://www.backblaze.com/"
						target="_blank"
						rel="noopener"
					>
						Backblaze
					</a>
				</div>
				<div
					id="start-menu-right-buttons"
					className={clsx("h-7 w-full", "flex")}
				>
					<button
						type="button"
						id="start-menu-power-button"
						className={clsx(
							"relative isolate",
							"w-2/5",
							"flex items-center justify-center",
							"rounded-l-sm rounded-r-xs",
							"p-px",
							"shadow-xs",
							"z-2",
							"border border-white/15 border-b-0",
						)}
					>
						<span
							aria-hidden
							className={clsx(
								"absolute inset-0 -z-10",
								"bg-secondary-300",
								"rounded-l-sm rounded-r-xs",
								"brightness-80 saturate-90",
							)}
						/>
						<div
							className={clsx(
								"bg-power",
								"w-full h-full",
								"flex items-center justify-center",
								"rounded-l-sm rounded-r-xs",
								"brightness-90",
							)}
						>
							<div className="relative w-5.5 h-5.5">
								<IconPower
									color="white"
									size={20}
									className="absolute isolate z-2 top-0 left-0"
								/>
								<div className="absolute isolate z-1 top-0 left-0 bg-black/25 blur-xs w-4.5 h-4.5" />
								<IconPower
									color="black"
									size={21}
									className="absolute opacity-25 isolate top-0 left-0 blur-[1px]"
								/>
							</div>
						</div>
					</button>
					<button
						type="button"
						id="start-menu-lock-button"
						className={clsx(
							"relative isolate",
							"w-2/5",
							"flex items-center justify-center",
							"rounded-xs",
							"p-px",
							"shadow-xs",
							"border border-white/3 border-b-0",
						)}
					>
						<span
							aria-hidden
							className={clsx(
								"absolute inset-0 -z-10",
								"bg-primary-300",
								"rounded-xs",
								"brightness-80 saturate-90",
							)}
						/>
						<div
							className={clsx(
								"bg-taskbar",
								"w-full h-full",
								"flex items-center justify-center",
								"rounded-xs",
								"brightness-90",
							)}
						>
							<div className="relative w-5.5 h-5.5">
								<IconLockFilled
									color="white"
									size={20}
									className="absolute isolate z-2 top-0 left-0"
								/>
								<div className="absolute isolate z-1 top-0 left-0 bg-black/25 blur-xs w-4.5 h-4.5" />
								<IconLockFilled
									color="black"
									size={21}
									className="absolute opacity-25 isolate top-0 left-0 blur-[1px]"
								/>
							</div>
						</div>
					</button>
					<button
						type="button"
						id="start-menu-other-button"
						className={clsx(
							"relative isolate",
							"w-1/5",
							"flex items-center justify-center",
							"rounded-l-xs rounded-r-sm",
							"p-px",
							"shadow-xs",
							"border border-white/3 border-b-0",
						)}
					>
						<span
							aria-hidden
							className={clsx(
								"absolute inset-0 -z-10",
								"bg-primary-300",
								"rounded-l-xs rounded-r-md",
								"brightness-80 saturate-90",
							)}
						/>
						<div
							className={clsx(
								"bg-taskbar",
								"w-full h-full",
								"flex items-center justify-center",
								"rounded-l-xs rounded-r-md",
								"brightness-90",
							)}
						>
							<div className="relative w-5.5 h-5.5">
								<IconChevronRightFilled
									color="white"
									size={20}
									className="absolute isolate z-2 top-0 left-0"
								/>
								<div className="absolute isolate z-1 top-0 left-0 bg-black/25 blur-xs w-4.5 h-4.5" />
								<IconChevronRightFilled
									color="black"
									size={21}
									className="absolute opacity-25 isolate top-0 left-0 blur-[1px]"
								/>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
