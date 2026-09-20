import clsx from "clsx";
import { useBrowser } from "@/stores/browser";
import { capitalizeFirstLetter } from "@/utils/functions";
import { START_MENU_LEFT_LINK } from "@/utils/styles";

function PageButton({ page }: { page: string }) {
  const { addTab } = useBrowser();
  return (
    <button
      type="button"
      className={clsx(START_MENU_LEFT_LINK, "text-left")}
      onClick={() => addTab({ path: page, openedAt: Date.now() })}
    >
      {capitalizeFirstLetter(page)}
    </button>
  );
}

export default function StartMenuPages() {
  return (
    <div
      id="start-menu-left"
      className={clsx("flex flex-col gap-2", "h-full", "basis-3/5")}
    >
      <div
        id="start-menu-left-items"
        className={clsx(
          "flex flex-col",
          "bg-primary-50",
          "p-1",
          "gap-2",
          "basis-full",
          "rounded-sm",
          "inset-shadow-sm",
          "border border-primary-400/50",
          "select-none",
        )}
      >
        {["about", "work", "blog"].map((page) => (
          <PageButton key={page} {...{ page }} />
        ))}
      </div>
      <input
        type="text"
        id="start-menu-left-search"
        placeholder="Start search..."
        className={clsx(
          "bg-primary-50",
          "h-7",
          "p-1",
          "placeholder:italic",
          "text-sm",
          "inset-shadow-sm",
          "border border-primary-400/50",
        )}
      />
    </div>
  );
}
