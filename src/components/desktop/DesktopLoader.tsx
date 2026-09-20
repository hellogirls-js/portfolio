import clsx from "clsx";
import Spinner from "../utils/Spinner";
import { IconHeartFilled } from "@tabler/icons-react";

export default function DesktopLoader() {
  return (
    <div
      id="desktop-loader-container"
      className={clsx(
        "absolute",
        "top-0 left-0",
        "z-200",
        "w-screen h-screen",
        "bg-linear-to-b from-primary-300 to-secondary-400",
        "flex items-center justify-center",
      )}
    >
      <div
        className={clsx(
          "absolute",
          "size-full",
          "bg-radial-[at_5%_0%] from-primary-100 to-transparent to-25%",
        )}
      />
      <div
        className={clsx(
          "absolute",
          "left-0 bottom-0",
          "w-full h-40",
          "bg-linear-to-b",
          "from-secondary-100/25 to-transparent",
          "border-t border-secondary-200",
          "blur-[1px]",
        )}
      />
      <div
        id="desktop-loader-items"
        className={clsx("flex items-center gap-4")}
      >
        <Spinner size={32} />
        <div className={clsx("text-base-50", "text-2xl", "text-shadow-md")}>
          Loading...
        </div>
      </div>
    </div>
  );
}
