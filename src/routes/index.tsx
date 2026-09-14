import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import Taskbar from "@/components/taskbar/Taskbar";
import { SOCIALS } from "@/utils/constants";
import DesktopIcon from "@/components/desktop/DesktopIcon";

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
				"bg-base-800",
			)}
		>
      <main className={clsx("basis-full", "relative")}>

        <div id="desktop_icons" className={clsx("w-full h-full", "py-2 px-4", "flex flex-col flex-wrap gap-16")}>
          {SOCIALS.map((social) => <DesktopIcon {...{social}} />)}
					</div>
			</main>
			<Taskbar />
		</div>
	);
}
