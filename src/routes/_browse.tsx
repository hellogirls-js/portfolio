import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import WindowButtons from "@/components/window/WindowButtons";
import { capitalizeFirstLetter } from "@/utils/functions";

// TODO: for browser window
// base tabs off of router history
//

export const Route = createFileRoute("/_browse")({
  component: BrowserLayout,
});

function BrowserLayout() {
  const router = useRouter();

  const path = router.state.location.pathname.slice(1);

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
      <div
        id="browser-tabs-address-container"
        className={clsx(
          "drop-shadow-[0px -8px 8px shadow-black/100]",
          "flex-col",
        )}
      >
        <div
          id="browser-tabs-container"
          className={clsx("flex justify-start", "w-full h-10", "pl-12")}
        >
          <div
            className={clsx(
              "relative",
              "browser-tab",
              "select-none",
              "basis-1/5",
              "text-sm",
              "bg-primary-100",
              "border-t border-primary-50",
              "rounded-t-3xl",
              "flex items-center justify-between",
              "px-4",
              "before:absolute",
              "before:bottom-0",
              "before:-left-6",
              "before:w-6 before:h-6",
              "before:content-['']",
              "before:bg-[radial-gradient(circle_at_0_0,transparent_24px,var(--color-primary-100)_24px)]",
              "after:absolute",
              "after:bottom-0",
              "after:-right-6",
              "after:w-6 after:h-6",
              "after:content-['']",
              "after:bg-[radial-gradient(circle_at_100%_0,transparent_24px,var(--color-primary-100)_24px)]",
            )}
          >
            <div className={clsx("name-icon-container", "flex items-center")}>
              {capitalizeFirstLetter(path)}
            </div>
            <IconX size={16} color="#252e93" />
          </div>
        </div>
        <div
          id="browser-address-bar-container"
          className={clsx(
            "w-full",
            "h-16",
            "px-4 py-2",
            "bg-linear-to-b from-primary-100 to-primary-200",
            "rounded-tr-sm",
            "flex items-center",
            "border-l border-base-50",
          )}
        >
          <button
            type="button"
            className={clsx(
              "bg-linear-to-b from-primary-100 to-primary-200",
              "flex items-center justify-center",
              "-gap-4",
              "text-center",
              "aspect-square h-full",
              "rounded-full",
              "border border-primary-300",
              "z-10",
            )}
          >
            <IconArrowLeft size={32} className={clsx("text-primary-300")} />
          </button>
          <div
            id="browser-address-bar"
            className={clsx(
              "flex items-center",
              "box-border",
              "text-sm text-base-400",
              "basis-full h-8",
              "py-2 pl-6 -ml-3",
              "bg-base-50",
              "border border-primary-300",
            )}
          >
            https://hellogirls.info/{path}
          </div>
        </div>
      </div>
      <div className="browser-content w-full h-full bg-base-50 rounded-b-sm shadow-2xl shadow-black/10">
        <Outlet />
      </div>
    </div>
  );
}
