import clsx from "clsx";
import { BeatLoader } from "react-spinners";

export default function BlogLoadingScreen() {
  return (
    <div id="page-container" className={clsx("bg-base-50", "size-full")}>
      <div
        className={clsx(
          "m-auto",
          "w-full max-w-3xl h-full",
          "flex flex-col items-center justify-center gap-8",
        )}
      >
        {}
        <h1
          className={clsx(
            "font-modern-header font-black uppercase font-stretch-expanded",
            "text-base-600 text-5xl",
          )}
        >
          Loading
        </h1>

        <BeatLoader
          color="#2e39b8"
          className={clsx("text-primary-500", "fill-primary-500")}
        />
      </div>
    </div>
  );
}
