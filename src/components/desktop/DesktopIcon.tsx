import clsx from "clsx";
import { useCallback, useState } from "react";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function DesktopIcon({
  social,
  iconUrl,
}: {
  social: Social;
  iconUrl: string;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const onDoubleClick = useCallback(() => {
    window.open(social.url);
  }, []);

  return (
    <button
      type="button"
      onDoubleClick={onDoubleClick}
      onClick={() => setIsSelected((prev) => !prev)}
      className={clsx(
        "desktop-icon-container flex flex-col items-center gap-1",
        "box-border",
        "py-2 rounded-sm",
        "w-20",
        "select-none",
        !isSelected &&
          "hover:bg-linear-to-b hover:from-base-100/33 hover:from-80% hover:to-transparent",
        !isSelected && "hover:border hover:border-base-50",
        isSelected && "bg-linear-to-b from-base-100/33 from-80% to-transparent",
        isSelected && "border border-base-50",
      )}
    >
      <div className="desktop-icon relative">
        <div className="desktop-icon-shortcut absolute -bottom-1 -left-1 z-2">
          <img
            alt={social.name}
            className="pointer-events-none select-none"
            src="https://assets.hellogirls.info/portfolio/assets/shortcut.ico"
            width={24}
            height={24}
          />
        </div>
        <img
          src={`https://assets.hellogirls.info/portfolio/icons/${social.name}.webp`}
          alt={social.name}
          width={60}
          height={60}
          className="drop-shadow-sm pointer-events-none select-none"
        />
      </div>
      <div
        className={clsx(
          "text-shadow-md",
          "text-base-50",
          "text-sm text-center",
        )}
      >
        {capitalizeFirstLetter(social.name)}
      </div>
    </button>
  );
}
