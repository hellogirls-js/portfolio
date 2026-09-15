import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import WindowButtons from "@/components/window/WindowButtons";
import { capitalizeFirstLetter } from "@/utils/functions";

export const Route = createFileRoute("/_browse")({
	component: BrowserLayout,
});

function BrowserLayout() {
	const router = useRouter();

	const path = router.state.location.pathname.slice(1);
	console.log({ path });

	return (
		<div
			className={clsx(
				"browser-window-container",
				"box-border",
				"h-full",
				"bg-browser-window",
				"backdrop-blur-2xl",
				"px-2 pb-2",
				"flex flex-col",
			)}
		>
			<WindowButtons />
			<div id="browser-tabs-container" className={clsx("flex justify-start")}>
				<div className={clsx("browser-tab")}>{capitalizeFirstLetter(path)}</div>
			</div>
			<div className="browser-content w-full h-full bg-base-50 rounded-b-sm shadow-2xl shadow-black/10">
				<Outlet />
			</div>
		</div>
	);
}
