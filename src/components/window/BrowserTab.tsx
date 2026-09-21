/** biome-ignore-all lint/a11y/useSemanticElements: nesting a button inside of a button is wrong semantically, hr is confusing for vertical separators */
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import {
  useCallback,
  useMemo,
  type KeyboardEvent as ReactKeyboardEvent,
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

  const tabAction = useCallback(() => {
    if (isActiveTab) return;
    switchTab(tab.openedAt);
  }, [isActiveTab, switchTab]);

  const onTabClick = useCallback(
    (_event: ReactMouseEvent) => {
      tabAction();
    },
    [tabAction],
  );

  const onTabKeyEvent = useCallback(
    (event: ReactKeyboardEvent) => {
      if (event.key !== "enter") return;
      tabAction();
    },
    [tabAction],
  );

  return (
    <>
      <div
        role="button"
        onClick={onTabClick}
        onKeyDown={onTabKeyEvent}
        tabIndex={0}
        className={clsx(
          "relative h-full browser-tab select-none basis-1/5 text-sm",
          "rounded-t-3xl flex items-center justify-between px-4",
          isActiveTab && [
            "bg-primary-100",
            "border-t border-t-primary-50",
            "before:absolute before:bottom-0 before:-left-6 before:w-6 before:h-6 before:content-['']",
            "before:bg-[radial-gradient(circle_at_0_0,transparent_24px,var(--color-primary-100)_24px)]",
            "after:absolute after:bottom-0 after:-right-6 after:w-6 after:h-6 after:content-['']",
            "after:bg-[radial-gradient(circle_at_100%_0,transparent_24px,var(--color-primary-100)_24px)]",
          ],
        )}
      >
        <div className={clsx("name-icon-container", "flex items-center")}>
          {capitalizeFirstLetter(tab.path)}
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            closeTab(tab);
          }}
        >
          <IconX
            size={16}
            className={clsx(isActiveTab ? "text-primary-600" : "text-base-500")}
          />
        </button>
      </div>
      {index < tabs.length - 1 &&
        !isActiveTab &&
        index !== activeTabIndex - 1 && (
          <div role="separator" className="w-px h-1/2 bg-base-400" />
        )}
    </>
  );
}
