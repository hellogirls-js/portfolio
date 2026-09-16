import clsx from "clsx";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function DesktopIcon({social}: {social: Social}) {
  return (
    <div className={clsx("desktop-icon-container flex flex-col items-center gap-1", "size-18", "select-none")}>
      <div className="desktop-icon relative">
        <div className="desktop-icon-shortcut absolute -bottom-1 -left-1 z-2">
          <img alt={social.name} className="pointer-events-none select-none" src="https://assets.hellogirls.info/portfolio/assets/shortcut.ico" width={24} height={24} />
        </div>
        <img src={`https://assets.hellogirls.info/portfolio/icons/${social.name}.webp`} alt={social.name} width={60} height={60} className="drop-shadow-sm pointer-events-none select-none" />
      </div>
      <div className={clsx("text-shadow-md", "text-base-50", "text-sm text-center")}>{capitalizeFirstLetter(social.name)}</div>
    </div>
  )
}
