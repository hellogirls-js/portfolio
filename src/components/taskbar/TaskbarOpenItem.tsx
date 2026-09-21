import clsx from "clsx";
import { useMemo } from "react";
import { useWindows } from "@/stores/windows";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function TaskbarOpenItem({ window }: { window: IWindow }) {
  const { windows, activeWindow } = useWindows();

  const isActiveWindow = useMemo(() => {
    console.log({ activeWindow, window });
    return activeWindow?.openedAt === window.openedAt;
  }, [windows, window, activeWindow]);

  return (
    <button
      type="button"
      className={clsx(
        "taskbar-item-container",
        "relative",
        "h-full max-w-1/4 w-1/4",
        "px-2",
        "border border-primary-800",
        "shadow-xs shadow-primary-200/50",
        "rounded-sm",
        "bg-taskbar",
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
      {capitalizeFirstLetter(window.title)}
    </button>
  );
}
