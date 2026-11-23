import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { useWindows } from "@/stores/windows";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function TaskbarOpenItem({ window }: { window: IWindow }) {
  const { windows, activeWindow, maximizeWindow, showWindow } = useWindows();

  const isActiveWindow = useMemo(() => {
    return activeWindow?.openedAt === window.openedAt;
  }, [windows, window, activeWindow]);

  const onTaskbarClick = useCallback(() => {
    if (window.shouldMaximize) {
      maximizeWindow(window);
    } else {
      showWindow(window);
    }
  }, [maximizeWindow, window]);

  return (
    <button
      type="button"
      onClick={onTaskbarClick}
      className={clsx(
        "taskbar-item-container",
        "flex items-center justify-center lg:justify-start gap-2",
        "relative",
        "h-full max-w-1/4 w-1/4",
        "px-2",
        "border border-primary-800",
        "shadow-xs shadow-primary-200/50",
        "rounded-sm",
        "bg-taskbar-button",
        "text-base-50 text-shadow-md text-sm text-left",
        isActiveWindow && [
          "after:content-['']",
          "after:absolute",
          "after:top-0 after:left-0",
          "after:size-full",
          "after:bg-radial-[at_75%_50%] after:from-secondary-600/50 after:from-50% after:to-transparent",
        ],
      )}
    >
      <img
        src={`https://assets.hellogirls.info/portfolio/icons/${window.file}`}
        alt={window.title}
        width={16}
        height={16}
      />
      <span className="hidden lg:block text-shadow-2xs">
        {capitalizeFirstLetter(window.title)}
      </span>
    </button>
  );
}
