import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { START_MENU_LEFT_LINK } from "@/utils/styles";

export default function StartMenuPages() {
  return (
    <div
      id="start-menu-left"
      className={clsx("flex flex-col gap-2", "h-full", "basis-3/5")}
    >
      <div
        id="start-menu-left-items"
        className={clsx(
          "flex flex-col",
          "bg-primary-50",
          "p-1",
          "gap-2",
          "basis-full",
          "rounded-sm",
          "inset-shadow-sm",
          "border border-primary-400/50",
          "select-none",
        )}
      >
        <Link className={clsx(START_MENU_LEFT_LINK)} to="/about">
          About
        </Link>
        <Link className={clsx(START_MENU_LEFT_LINK)} to="/work">
          Work
        </Link>
        <Link
          className={clsx(START_MENU_LEFT_LINK)}
          to="/blog"
          params={{ postSlug: "" }}
        >
          Blog
        </Link>
      </div>
      <input
        type="text"
        id="start-menu-left-search"
        placeholder="Start search..."
        className={clsx(
          "bg-primary-50",
          "h-7",
          "p-1",
          "placeholder:italic",
          "text-sm",
          "inset-shadow-sm",
          "border border-primary-400/50",
        )}
      />
    </div>
  );
}
