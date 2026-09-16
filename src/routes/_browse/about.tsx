import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createFileRoute("/_browse/about")({
	component: About,
});

function About() {
	return (
		<div
			className={clsx(
				"page-container",
				"box-border",
				"w-full h-full",
				"overflow-y-auto",
			)}
		>
			<div
				id="about-page"
				className={clsx(
					"w-full h-full",
					"p-2",
					"bg-linear-to-b from-secondary-200 to-secondary-300 bg-fixed",
				)}
			>
				<div
					id="about-content-container"
					className={clsx(
						"w-4/6 h-auto",
						"m-auto p-2",
						"bg-base-50",
						"border border-secondary-600 rounded-sm font-website",
					)}
				>
					hi i'm son :)
				</div>
			</div>
		</div>
	);
}
