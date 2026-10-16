import { createFileRoute, Outlet } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createFileRoute("/_browse/_blog")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			id="page-container"
			className={clsx(
				"bg-base-50",
				"size-full",
				"flex flex-col",
				"overflow-y-auto",
			)}
		>
			<div
				id="page-title"
				className={clsx(
					"sticky top-0",
					"bg-base-50/90",
					"backdrop-blur-sm",
					"font-modern-header font-black font-stretch-expanded",
					"uppercase",
					"text-primary-500",
					"text-5xl",
					"border-b border-b-base-200",
					"p-4",
				)}
			>
				<h1>Son Hellogirls</h1>
			</div>
			<main className={clsx("grow p-4")}>
				<Outlet />
			</main>
		</div>
	);
}
