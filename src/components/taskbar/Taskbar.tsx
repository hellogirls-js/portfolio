import clsx from "clsx";
import StartButton from "@/components/taskbar/StartMenu/StartButton";
import Clock from "@/components/taskbar/Clock";

export default function Taskbar() {
  return (
    <footer
      id="taskbar-container"
      className={clsx(
        "box-border",
        "z-50",
        "flex items-center justify-between",
        "w-full",
        "h-12",
        "px-4",
        "bg-taskbar",
        "backdrop-blur-sm",
        "border-t-primary-300",
      )}
    >
      <div id="taskbar-left" className={clsx("flex items-center")}>
        <StartButton />
      </div>
      <div id="taskbar-center"></div>
      <div id="taskbar-right">
        <Clock />
      </div>
    </footer>
  );
}
