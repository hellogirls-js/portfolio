import {
  IconBrandBluesky,
  IconBrandTwitter,
  IconCoffee,
} from "@tabler/icons-react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import ExternalLink from "@/components/ExternalLink";

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
            "flex flex-wrap lg:flex-nowrap justify-between gap-4 lg:gap-0",
            "bg-base-50/90",
            "backdrop-blur-sm",
            "font-mono font-bold font-stretch-expanded",
            "text-primary-500",
            "text-5xl",
            "border-b border-b-base-200",
            "p-4 px-8",
          )}
        >
          <h1 className="font-bold">Son Hellogirls</h1>
          <div className="flex items-center gap-8 text-primary-300">
            <ExternalLink to="https://twitter.com/hellogirls_DEV">
              <IconBrandTwitter />
            </ExternalLink>
            <ExternalLink to="https://bsky.app/profile/hellogirls.info">
              <IconBrandBluesky />
            </ExternalLink>
            <ExternalLink to="https://buymeacoffee.com/hellogirls">
              <IconCoffee />
            </ExternalLink>
          </div>
        </div>
      )}
      <main className={clsx("grow")}>
        <Outlet />
      </main>
    </div>
  );
}
