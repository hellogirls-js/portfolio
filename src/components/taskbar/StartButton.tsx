import { IconHeartFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";

function StartMenu({ openMenu }: { openMenu: boolean }) {
	return (
		<div
			id="start-menu-container"
			className={clsx(
				"absolute",
				"flex items-center gap-1",
				"bottom-12 -left-4",
				"w-108 h-120",
				"p-2",
				"bg-linear-to-b from-primary-600/75 to-primary-700/75",
				"backdrop-blur-sm",
				"rounded-t-md",
				"border border-primary-400/50",
				"outline outline-primary-700",
				"shadow-md",
				openMenu ? "block" : "hidden",
			)}
		>
			<div
				id="start-menu-left"
				className={clsx("flex flex-col gap-2", "h-full", "basis-3/5")}
			>
				<div
					id="start-menu-left-items"
					className={clsx(
						"bg-primary-50",
						"basis-full",
						"rounded-sm",
						"inset-shadow-sm",
						"border border-primary-400/50",
					)}
				></div>
				<input
					type="text"
					id="start-menu-left-search"
					placeholder="Start search..."
					className={clsx(
						"bg-primary-50",
						"h-9",
						"p-1",
						"placeholder:italic",
						"inset-shadow-sm",
						"border border-primary-400/50",
					)}
				/>
			</div>
		</div>
	);
}

export default function StartButton() {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<div id="start-button-container" className={clsx("relative")}>
			<StartMenu {...{ openMenu }} />
			<button
				type="button"
				id="start-button"
				onClick={() => setOpenMenu((prev) => !prev)}
				className={clsx(
					"box-border",
					"relative",
					"overflow-hidden",
					"w-12 h-12",
					"rounded-full",
					"bg-secondary-800",
					"p-0.5",
					"outline-1 outline-primary-900/50",
				)}
			>
				<div
					className={clsx(
						"relative",
						"w-full h-full",
						"bg-start",
						"rounded-full",
					)}
				>
					<div
						className={clsx(
							"absolute",
							"flex items-center justify-center",
							"w-full h-full",
							"rounded-full",
							"bg-radial-[at_50%_95%] from-secondary-600 from-5% to-transparent",
						)}
					>
						<IconHeartFilled color="white" size={36} style={{ opacity: 0.8 }} />
					</div>
				</div>
			</button>
		</div>
	);
}
