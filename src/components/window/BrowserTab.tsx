import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import {
  useCallback,
  useMemo,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useBrowser } from "@/stores/browser";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function BrowserTab({
  tab,
  index,
}: {
  tab: IBrowserTab;
  index: number;
}) {
  const { activeTabId, switchTab, tabs, closeTab } = useBrowser();

  const isActiveTab = useMemo(
    () => activeTabId === tab.openedAt,
    [activeTabId],
  );

  const activeTabIndex = useMemo(() => {
    if (isActiveTab) return index;
    return tabs.findIndex((tab) => tab.openedAt === activeTabId);
  }, [activeTabId, isActiveTab]);

  const onTabClick = useCallback(
    (_event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (isActiveTab) {
        return;
      } else {
        switchTab(tab.openedAt);
      }
    },
    [isActiveTab],
  );

  return (
    <>
      <button
        type="button"
        onClick={onTabClick}
        className={clsx(
          "relative",
          "h-full",
          "browser-tab",
          "select-none",
          "basis-1/5",
          "text-sm",
          isActiveTab && "bg-primary-100",
          isActiveTab && "border-t border-t-primary-50",
          "rounded-t-3xl",
          "flex items-center justify-between",
          "px-4",
          isActiveTab && "before:absolute",
          isActiveTab && "before:bottom-0",
          isActiveTab && "before:-left-6",
          isActiveTab && "before:w-6 before:h-6",
          isActiveTab && "before:content-['']",
          isActiveTab &&
            `before:bg-[radial-gradient(circle_at_0_0,transparent_24px,var(--color-primary-100)_24px)]`,
          isActiveTab && "after:absolute",
          isActiveTab && "after:bottom-0",
          isActiveTab && "after:-right-6",
          isActiveTab && "after:w-6 after:h-6",
          isActiveTab && "after:content-['']",
          isActiveTab &&
            "after:bg-[radial-gradient(circle_at_100%_0,transparent_24px,var(--color-primary-100)_24px)]",
        )}
      >
        <div className={clsx("name-icon-container", "flex items-center")}>
          {capitalizeFirstLetter(tab.path)}
        </div>
        <button
          type="button"
          onClick={(event) => {
            console.log("clicky");
            event.stopPropagation();
            closeTab(tab);
          }}
        >
          <IconX
            size={16}
            className={clsx(isActiveTab ? "text-primary-600" : "text-base-500")}
          />
        </button>
      </button>
      {index < tabs.length - 1 &&
        !isActiveTab &&
        index !== activeTabIndex - 1 && (
          <div className="w-px h-1/2 bg-base-400" />
        )}
    </>
  );
}
