import { createFileRoute, Outlet } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createFileRoute("/_browse")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className={clsx("browser-window", "border border-white")}>
			<Outlet />
		</div>
	);
}
