import {
  IconPower,
  IconLockFilled,
  IconChevronRightFilled,
} from "@tabler/icons-react";
import clsx from "clsx";

export default function StartMenuOptionButtons() {
  return (
    <div id="start-menu-right-buttons" className={clsx("h-7 w-full", "flex")}>
      <button
        type="button"
        id="start-menu-power-button"
        className={clsx(
          "relative isolate",
          "w-2/5",
          "flex items-center justify-center",
          "rounded-l-sm rounded-r-xs",
          "p-px",
          "shadow-xs",
          "z-2",
          "border border-white/15 border-b-0",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "absolute inset-0 -z-10",
            "bg-secondary-300",
            "rounded-l-sm rounded-r-xs",
            "brightness-80 saturate-90",
          )}
        />
        <div
          className={clsx(
            "bg-power",
            "w-full h-full",
            "flex items-center justify-center",
            "rounded-l-sm rounded-r-xs",
            "brightness-90",
          )}
        >
          <div className="relative w-5.5 h-5.5">
            <IconPower
              color="white"
              size={20}
              className="absolute isolate z-2 top-0 left-0"
            />
            <div className="absolute isolate z-1 top-0 left-0 bg-black/25 blur-xs w-4.5 h-4.5" />
            <IconPower
              color="black"
              size={21}
              className="absolute opacity-25 isolate top-0 left-0 blur-[1px]"
            />
          </div>
        </div>
      </button>
      <button
        type="button"
        id="start-menu-lock-button"
        className={clsx(
          "relative isolate",
          "w-2/5",
          "flex items-center justify-center",
          "rounded-xs",
          "p-px",
          "shadow-xs",
          "border border-white/3 border-b-0",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "absolute inset-0 -z-10",
            "bg-primary-300",
            "rounded-xs",
            "brightness-80 saturate-90",
          )}
        />
        <div
          className={clsx(
            "bg-taskbar",
            "w-full h-full",
            "flex items-center justify-center",
            "rounded-xs",
            "brightness-90",
          )}
        >
          <div className="relative w-5.5 h-5.5">
            <IconLockFilled
              color="white"
              size={20}
              className="absolute isolate z-2 top-0 left-0"
            />
            <div className="absolute isolate z-1 top-0 left-0 bg-black/25 blur-xs w-4.5 h-4.5" />
            <IconLockFilled
              color="black"
              size={21}
              className="absolute opacity-25 isolate top-0 left-0 blur-[1px]"
            />
          </div>
        </div>
      </button>
      <button
        type="button"
        id="start-menu-other-button"
        className={clsx(
          "relative isolate",
          "w-1/5",
          "flex items-center justify-center",
          "rounded-l-xs rounded-r-sm",
          "p-px",
          "shadow-xs",
          "border border-white/3 border-b-0",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "absolute inset-0 -z-10",
            "bg-primary-300",
            "rounded-l-xs rounded-r-md",
            "brightness-80 saturate-90",
          )}
        />
        <div
          className={clsx(
            "bg-taskbar",
            "w-full h-full",
            "flex items-center justify-center",
            "rounded-l-xs rounded-r-md",
            "brightness-90",
          )}
        >
          <div className="relative w-5.5 h-5.5">
            <IconChevronRightFilled
              color="white"
              size={20}
              className="absolute isolate z-2 top-0 left-0"
            />
            <div className="absolute isolate z-1 top-0 left-0 bg-black/25 blur-xs w-4.5 h-4.5" />
            <IconChevronRightFilled
              color="black"
              size={21}
              className="absolute opacity-25 isolate top-0 left-0 blur-[1px]"
            />
          </div>
        </div>
      </button>
    </div>
  );
}
