import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_browse/_blog/blog/$postSlug")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/blog/$postSlug"!</div>;
}
