import { IconSquare, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { type MouseEvent, useCallback } from "react";
import { useBrowser } from "@/stores/browser";
import { useWindows } from "@/stores/windows";

export default function WindowButtons({ window }: { window: IWindow | null }) {
  const { browserWindow, clearBrowserWindow } = useBrowser();
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindows();

  const onCloseButtonClick = useCallback(
    (_event: MouseEvent) => {
      if (!window) return;
      closeWindow(window);
      if (browserWindow?.openedAt === window.openedAt) {
        clearBrowserWindow();
      }
    },
    [window, browserWindow, closeWindow],
  );

  const onMinimizeClick = useCallback(() => {
    if (window) minimizeWindow(window);
  }, [window, minimizeWindow]);

  const onMaximizeClick = useCallback(() => {
    if (window) maximizeWindow(window);
  }, [window, maximizeWindow]);

  return (
    <div
      className={clsx(
        "window-buttons",
        "w-full",
        "flex items-center justify-end",
      )}
    >
      <button
        type="button"
        onClick={onMinimizeClick}
        className={clsx(
          "w-12",
          "py-1",
          "px-2",
          "bg-browser-button",
          "flex items-end justify-center",
          "border border-base-900/50",
          "rounded-bl-md",
        )}
      >
        <svg
          role="img"
          aria-label="line"
          viewBox="0 0 16 16"
          width={16}
          height={16}
        >
          <line x1={0} x2={16} y1={14} y2={14} stroke="white" />
        </svg>
      </button>
      <button
        type="button"
        disabled={!window?.shouldMaximize}
        onClick={onMaximizeClick}
        className={clsx(
          "w-12",
          "py-1",
          "px-2",
          "bg-browser-button",
          "flex items-center justify-center",
          "border border-base-900/50 border-l-0",
        )}
      >
        <IconSquare color="white" size={16} />
      </button>
      <button
        onClick={onCloseButtonClick}
        type="button"
        className={clsx(
          "w-12",
          "py-1",
          "px-2",
          "bg-power",
          "flex items-center justify-center",
          "border border-base-900/50 border-l-0",
          "rounded-br-md",
        )}
      >
        <IconX
          color="white"
          size={16}
          strokeWidth={2}
          className="drop-shadow-2xl"
        />
      </button>
    </div>
  );
}
