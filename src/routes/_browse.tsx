import { IconLine, IconSquare, IconStrokeStraight, IconX } from "@tabler/icons-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createFileRoute("/_browse")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className={clsx("browser-window-container", "box-border", "h-full", "bg-browser-window", "backdrop-blur-2xl", "px-2 pb-2", "flex flex-col")}>
      <div className={clsx("browser-buttons", "w-full", "flex items-center justify-end")}>
        <button className={clsx("w-12", "py-1", "px-2")}><IconStrokeStraight color="white" size={16} style={{rotate: "40deg"}} /></button>
        <button className={clsx("w-12", "py-1", "px-2")}><IconSquare color="white" size={16} stroke={2} /></button>
        <button className={clsx("w-12", "py-1", "px-2")}><IconX color="white" size={16} /></button>
      </div>
      <div className="browser-content w-full h-full bg-base-50 rounded-b-sm shadow-2xl shadow-black/10">
          <Outlet />
				</div>
		</div>
	);
}
