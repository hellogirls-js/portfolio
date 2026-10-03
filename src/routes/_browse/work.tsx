import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { PROJECTS } from "@/utils/constants";

export const Route = createFileRoute("/_browse/work")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			className={clsx(
				"page-container",
				"box-border",
				"w-full h-full max-h-full",
				"overflow-y-auto",
				"overflow-x-hidden",
				"scrollbar-thumb-base-100 scrollbar-track-base-300 scrollbar-gutter-stable",
			)}
		>
			<div id="work-page" className={clsx("size-full", "bg-secondary-300")}>
				<div
					id="work-page-container"
					className={clsx(
						"w-full max-w-3xl min-h-full",
						"pb-4",
						"m-auto",
						"bg-base-50",
					)}
				>
					<div id="work-content" className={clsx("px-4 py-2")}>
						<p>
							My projects come from my heart and soul. These are my favorite
							projects I've worked on! For a full list of things I've worked on,
							visit{" "}
							<a
								href="https://hellogirls.info/projects"
								target="_blank"
								rel="noreferrer"
								className="underline text-primary-500"
							>
								my main website
							</a>
							.
						</p>
						{PROJECTS.map((project) => (
							<div
								key={project.name}
								className={clsx("project-card-container")}
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
