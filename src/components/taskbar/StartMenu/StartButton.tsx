import { IconHeartFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { useRef, useState } from "react";
import StartMenu from "@/components/taskbar/StartMenu/StartMenu";

export default function StartButton() {
  const [openMenu, setOpenMenu] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div id="start-button-container" className={clsx("relative")}>
      <StartMenu {...{ openMenu, setOpenMenu, startButtonRef }} />
      <button
        type="button"
        id="start-button"
        ref={startButtonRef}
        onClick={() => setOpenMenu((prev) => !prev)}
        className={clsx(
          "box-border",
          "relative",
          "z-101",
          "overflow-hidden",
          "w-12 h-12",
          "rounded-full",
          "bg-secondary-800",
          "p-0.5",
          "outline-1 outline-primary-900/50",
          "hover:brightness-110",
        )}
      >
        <div
          className={clsx(
            "relative",
            "w-full h-full",
            "bg-start",
            "rounded-full",
          )}
        >
          <div
            className={clsx(
              "absolute",
              "flex items-center justify-center",
              "w-full h-full",
              "rounded-full",
              "bg-radial-[at_50%_95%] from-secondary-600 from-5% to-transparent",
            )}
          >
            <IconHeartFilled color="white" size={32} style={{ opacity: 0.8 }} />
          </div>
        </div>
      </button>
    </div>
  );
}
