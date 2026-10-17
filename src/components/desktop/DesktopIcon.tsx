import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function DesktopIcon({
  social,
  iconUrl,
}: {
  social: Social;
  iconUrl: string;
}) {
  const desktopIconRef = useRef<HTMLButtonElement | null>(null);

  const [isSelected, setIsSelected] = useState(false);

  const onDoubleClick = useCallback(() => {
    window.open(social.url);
  }, [social.url]);

  // Taps need to arrive as real click events: browsers only allow
  // window.open from a trusted click, not from a document touchend listener.
  const lastPointerType = useRef("mouse");

  const onClick = useCallback(() => {
    if (lastPointerType.current === "touch") onDoubleClick();
    else setIsSelected((prev) => !prev);
  }, [onDoubleClick]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopIconRef.current &&
        !desktopIconRef.current.contains(event.target as Node) &&
        isSelected
      ) {
        setIsSelected(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelected]);

  return (
    <Draggable
      nodeRef={desktopIconRef}
      axis="both"
      bounds="parent"
      // Don't preventDefault touchstart (that suppresses the tap's click);
      // touch-none below stops the page from scrolling during a drag instead.
      allowMobileScroll
    >
      <button
        ref={desktopIconRef}
        type="button"
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType;
        }}
        onDoubleClick={onDoubleClick}
        onClick={onClick}
        className={clsx(
          "desktop-icon-container flex flex-col items-center gap-1",
          "box-border",
          "touch-none",
          "py-2 rounded-sm",
          "w-20",
          "select-none",
          "border ",
          !isSelected && "border-transparent",
          !isSelected &&
            "hover:bg-linear-to-b hover:from-base-100/33 hover:from-80% hover:to-transparent",
          !isSelected && "hover:border hover:border-base-50",
          isSelected &&
            "bg-linear-to-b from-base-100/33 from-80% to-transparent",
          isSelected && "border-base-50",
        )}
      >
        <div className="desktop-icon relative box-border">
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
            src={iconUrl}
            alt={social.name}
            className="drop-shadow-sm pointer-events-none select-none box-border"
            width={60}
            height={60}
            loading="lazy"
          />
        </div>
        <div
          className={clsx(
            "box-border",
            "text-shadow-lg",
            "text-base-50",
            "text-sm text-center",
          )}
        >
          {capitalizeFirstLetter(social.name)}
        </div>
      </button>
    </Draggable>
  );
}
