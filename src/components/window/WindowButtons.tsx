import { IconSquare, IconX } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

export default function WindowButtons() {
	return (
		<div
			className={clsx(
				"browser-buttons",
				"w-full",
				"flex items-center justify-end",
			)}
		>
			<button
				type="button"
				className={clsx(
					"w-12",
					"py-1",
					"px-2",
					"bg-browser-button",
					"flex items-end justify-center",
					"border border-base-900/50",
					"rounded-bl-md",
				)}
			>
				<svg
					role="img"
					aria-label="line"
					viewBox="0 0 16 16"
					width={12}
					height={12}
				>
					<line x1={0} x2={12} y1={10} y2={10} stroke="white" />
				</svg>
			</button>
			<button
				type="button"
				className={clsx(
					"w-12",
					"py-1",
					"px-2",
					"bg-browser-button",
					"flex items-center justify-center",
					"border border-base-900/50 border-l-0",
				)}
			>
				<IconSquare color="white" size={12} />
			</button>
			<Link to="/">
				<button
					type="button"
					className={clsx(
						"w-12",
						"py-1",
						"px-2",
						"bg-power",
						"flex items-center justify-center",
						"border border-base-900/50 border-l-0",
						"rounded-br-md",
					)}
				>
					<IconX
						color="white"
						size={12}
						strokeWidth={2}
						className="drop-shadow-2xl"
					/>
				</button>
			</Link>
		</div>
	);
}
