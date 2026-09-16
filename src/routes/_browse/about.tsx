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
				"p-2",
				"overflow-y-auto",
			)}
		>
			hi i'm son :)
		</div>
	);
}
