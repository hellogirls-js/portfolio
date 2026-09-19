import clsx from "clsx";
import Spinner from "../utils/Spinner";

export default function DesktopLoader() {
  return (
    <div
      id="desktop-loader-container"
      className={clsx(
        "absolute",
        "top-0 left-0",
        "z-200",
        "w-screen h-screen",
        "bg-base-50",
      )}
    >
      <div id="desktop-loader-items" className={clsx("flex items-center")}>
        <Spinner />
        Loading...
      </div>
    </div>
  );
}
