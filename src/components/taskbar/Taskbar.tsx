import clsx from "clsx";
import StartButton from "@/components/taskbar/StartMenu/StartButton";
import Clock from "@/components/taskbar/Clock";
import { useWindows } from "@/stores/windows";
import TaskbarOpenItem from "./TaskbarOpenItem";

export default function Taskbar() {
  const { windows } = useWindows();

  return (
    <footer
      id="taskbar-container"
      className={clsx(
        "box-border",
        "z-50",
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
        <StartButton />
      </div>
      <div
        id="taskbar-center"
        className={clsx("flex items-center justify-start grow", "h-full")}
      >
        {windows.map((window) => (
          <TaskbarOpenItem key={window.openedAt} {...{ window }} />
        ))}
      </div>
      <div id="taskbar-right">
        <Clock />
      </div>
    </footer>
  );
}
