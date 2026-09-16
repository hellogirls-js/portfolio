import { IconSquare, IconX } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

export default function WindowButtons() {
  return (
    <div
      className={clsx(
        "browser-buttons",
        "w-full",
        "flex items-center justify-end",
      )}
    >
      <button
        type="button"
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
      <Link to="/">
        <button
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
      </Link>
    </div>
  );
}
