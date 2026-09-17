import clsx from "clsx";
import { START_MENU_RIGHT_LINK } from "@/utils/styles";
import StartMenuOptionButtons from "./StartMenuOptionButtons";

export default function StartMenuCredits() {
  return (
    <div
      id="start-menu-right"
      className={clsx("flex flex-col gap-2", "h-full", "basis-2/5")}
    >
      <div
        id="start-menu-right-items"
        className={clsx(
          "basis-full",
          "flex flex-col gap-4",
          "px-1 py-2",
          "mt-20",
        )}
      >
        <a
          className={START_MENU_RIGHT_LINK}
          href="https://bun.sh"
          target="_blank"
          rel="noopener"
        >
          Bun
        </a>
        <a
          className={START_MENU_RIGHT_LINK}
          href="https://react.dev"
          target="_blank"
          rel="noopener"
        >
          React
        </a>
        <a
          className={START_MENU_RIGHT_LINK}
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener"
        >
          Tailwind
        </a>
        <a
          className={START_MENU_RIGHT_LINK}
          href="https://tanstack.com/router/latest"
          target="_blank"
          rel="noopener"
        >
          Tanstack Router
        </a>
        <div className="box-content h-px w-full border-b border-b-primary-400 bg-black" />
        <a
          className={START_MENU_RIGHT_LINK}
          href="https://www.backblaze.com/"
          target="_blank"
          rel="noopener"
        >
          Backblaze
        </a>
      </div>
      <StartMenuOptionButtons />
    </div>
  );
}
