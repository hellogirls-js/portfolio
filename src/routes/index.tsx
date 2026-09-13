import { createFileRoute, Link } from "@tanstack/react-router";
import clsx from "clsx";
import StartButton from "../components/taskbar/StartButton";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div
			id="home-container"
			className={clsx(
				"font-body",
				"size-full",
				"box-border",
				"flex",
				"flex-col",
				"bg-black",
			)}
		>
			<main className={clsx("basis-full", "relative")}></main>
			<footer
				id="taskbar-container"
				className={clsx(
					"box-border",
					"flex items-center",
					"w-full",
					"h-12",
					"px-4",
					"bg-taskbar",
					"backdrop-blur-sm",
					"border-t-primary-300",
				)}
			>
				<div id="taskbar-left" className={clsx("flex items-center")}>
					<StartButton />
				</div>
				<div id="taskbar-center"></div>
				<div id="taskbar-right"></div>
			</footer>
		</div>
	);
}
