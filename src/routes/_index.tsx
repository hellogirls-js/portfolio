import { createFileRoute, Outlet } from "@tanstack/react-router";
import clsx from "clsx";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import Taskbar from "@/components/taskbar/Taskbar";
import { SOCIALS } from "@/utils/constants";

export const Route = createFileRoute("/_index")({
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
				"bg-base-800",
			)}
		>
			<main className={clsx("basis-full", "relative")}>
				<div
					id="page-container"
					className={clsx("absolute", "z-10", "w-full h-full")}
				>
					<Outlet />
				</div>
			</main>
			<Taskbar />
		</div>
	);
}
