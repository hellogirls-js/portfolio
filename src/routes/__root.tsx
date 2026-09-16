import DesktopIcon from "@/components/desktop/DesktopIcon";
import Taskbar from "@/components/taskbar/Taskbar";
import { SOCIALS } from "@/utils/constants";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import clsx from "clsx";

function RootLayout() {
  return (
    <div
      id="home-container"
      className={clsx(
        "font-body",
        "size-full",
        "box-border",
        "flex",
        "flex-col",
        "bg-base-400",
      )}
    >
      <main className={clsx("basis-full", "relative")}>
        <div id="page-container" className={clsx("w-full h-full")}>
          <Outlet />
        </div>
      </main>
      <Taskbar />
    </div>
  );
}

export const Route = createRootRoute({ component: RootLayout });
