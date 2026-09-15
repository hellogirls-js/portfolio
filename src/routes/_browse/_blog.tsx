import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_browse/_blog")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
