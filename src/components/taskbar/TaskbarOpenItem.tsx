import clsx from "clsx";
import { useMemo } from "react";
import { useWindows } from "@/stores/windows";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function TaskbarOpenItem({ window }: { window: IWindow }) {
  const { windows, activeWindow } = useWindows();

  const isActiveWindow = useMemo(() => {
    return activeWindow?.openedAt === window.openedAt;
  }, [windows, window, activeWindow]);

  return (
    <button
      type="button"
      className={clsx(
        "taskbar-item-container",
        "h-full max-w-1/4 w-1/4",
        "px-2",
        "border border-primary-800",
        "shadow-xs shadow-primary-200/50",
        "rounded-xs",
        isActiveWindow ? "bg-power" : "bg-taskbar",
        "text-base-50 text-shadow-md text-sm text-left",
      )}
    >
      {capitalizeFirstLetter(window.title)}
    </button>
  );
}
