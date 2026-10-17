import clsx from "clsx";
import { START_MENU_RIGHT_LINK } from "@/utils/styles";
import StartMenuOptionButtons from "./StartMenuOptionButtons";
import ExternalLink from "@/components/ExternalLink";

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
        <ExternalLink className={START_MENU_RIGHT_LINK} to="https://bun.sh">
          Bun
        </ExternalLink>
        <ExternalLink className={START_MENU_RIGHT_LINK} to="https://react.dev">
          React
        </ExternalLink>
        <div className="box-content h-px w-full border-b border-b-primary-400 bg-black" />
        <ExternalLink
          className={START_MENU_RIGHT_LINK}
          to="https://tailwindcss.com"
        >
          Tailwind
        </ExternalLink>
        <ExternalLink
          className={START_MENU_RIGHT_LINK}
          to="https://tanstack.com/router/latest"
        >
          Tanstack Router
        </ExternalLink>
        <ExternalLink
          className={START_MENU_RIGHT_LINK}
          to="https://zustand.docs.pmnd.rs/"
        >
          Zustand
        </ExternalLink>
        <ExternalLink className={START_MENU_RIGHT_LINK} to="https://motion.dev">
          Motion
        </ExternalLink>
        <div className="box-content h-px w-full border-b border-b-primary-400 bg-black" />
        <ExternalLink
          className={START_MENU_RIGHT_LINK}
          to="https://www.backblaze.com/"
        >
          Backblaze
        </ExternalLink>
      </div>
      <StartMenuOptionButtons />
    </div>
  );
}
