import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { useWindows } from "@/stores/windows";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function TaskbarOpenItem({ window }: { window: IWindow }) {
  const { windows, activeWindow, maximizeWindow } = useWindows();

  const isActiveWindow = useMemo(() => {
    return activeWindow?.openedAt === window.openedAt;
  }, [windows, window, activeWindow]);

  const onTaskbarClick = useCallback(() => {
    maximizeWindow(window);
  }, [maximizeWindow, window]);

  return (
    <button
      type="button"
      onClick={onTaskbarClick}
      className={clsx(
        "taskbar-item-container",
        "flex items-center gap-2",
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
          "after:bg-radial-[at_75%_50%] after:from-secondary-400/50 after:from-50% after:to-transparent",
        ],
      )}
    >
      <img
        src={`https://assets.hellogirls.info/portfolio/icons/${window.title}${window.title === "firefox" ? "1" : ""}.ico`}
        alt={window.title}
        width={16}
        height={16}
      />
      {capitalizeFirstLetter(window.title)}
    </button>
  );
}
