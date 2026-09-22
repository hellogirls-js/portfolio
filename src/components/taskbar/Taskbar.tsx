import clsx from "clsx";
import { useRef, useState } from "react";
import Clock from "@/components/taskbar/Clock";
import StartButton from "@/components/taskbar/StartMenu/StartButton";
import { useWindows } from "@/stores/windows";
import StartMenu from "./StartMenu/StartMenu";
import TaskbarOpenItem from "./TaskbarOpenItem";

export default function Taskbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const { windows } = useWindows();

  return (
    <div>
      <footer
        id="taskbar-container"
        className={clsx(
          "relative",
          "z-3",
          "box-border",
          "flex items-center justify-between gap-4",
          "w-full",
          "h-12",
          "px-4 py-2",
          "bg-taskbar",
          "backdrop-blur-sm",
          "border-t-primary-300",
        )}
      >
        <div id="taskbar-left" className={clsx("flex items-center")}>
          <StartButton {...{ startButtonRef, setOpenMenu }} />
        </div>
        <div
          id="taskbar-center"
          className={clsx("flex items-center justify-start grow", "h-full")}
        >
          {windows.map((window) => (
            <TaskbarOpenItem key={window.openedAt} {...{ window }} />
          ))}
        </div>
        <div id="taskbar-right" className={clsx("flex items-center gap-2")}>
          <div className="flex items-center gap-1">
            <img
              src="https://assets.hellogirls.info/portfolio/icons/volume_loud.ico"
              width={16}
              height={16}
              alt="volume"
            />
            <img
              src="https://assets.hellogirls.info/portfolio/icons/Tray110.ico"
              alt="network"
            />
          </div>
          <Clock />
        </div>
      </footer>
      <StartMenu {...{ openMenu, setOpenMenu, startButtonRef }} />
    </div>
  );
}
