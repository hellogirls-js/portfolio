import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createFileRoute("/_browse/_blog")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();

  return (
    <div
      id="page-container"
      className={clsx(
        "font-modern-header font-stretch-expanded",
        "bg-base-50",
        "size-full",
        "flex flex-col",
        "overflow-y-auto",
        "overflow-x-hidden",
      )}
    >
      {pathname.split("/").filter((part) => part.length).length === 1 && (
        <div
          id="page-title"
          className={clsx(
            "bg-base-50/90",
            "backdrop-blur-sm",
            "font-mono font-bold font-stretch-expanded",
            "text-primary-500",
            "text-5xl",
            "border-b border-b-base-200",
            "p-4",
          )}
        >
          <h1 className="font-bold">Son Hellogirls</h1>
        </div>
      )}
      <main className={clsx("grow")}>
        <Outlet />
      </main>
    </div>
  );
}
