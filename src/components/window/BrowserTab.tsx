/** biome-ignore-all lint/a11y/useSemanticElements: nesting a button inside of a button is wrong semantically, hr is confusing for vertical separators */
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useMemo,
} from "react";
import { useBrowser } from "@/stores/browser";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function BrowserTab({
  tab,
}: {
  tab: IBrowserTab;
  index: number;
}) {
  const { activeTabId, switchTab, closeTab } = useBrowser();

  // tab.path can be nested (blog/some-post), icons and names use the section
  const section = tab.path.split("/")[0];

  const isActiveTab = useMemo(
    () => activeTabId === tab.openedAt,
    [activeTabId, tab.openedAt],
  );

  const tabAction = useCallback(() => {
    if (isActiveTab) return;
    switchTab(tab.openedAt);
  }, [isActiveTab, switchTab, tab.openedAt]);

  const onTabClick = useCallback(
    (_event: ReactMouseEvent) => {
      tabAction();
    },
    [tabAction],
  );

  const onTabKeyEvent = useCallback(
    (event: ReactKeyboardEvent) => {
      if (event.key !== "Enter") return;
      tabAction();
    },
    [tabAction],
  );

  const onTabClose = useCallback(
    (event: ReactMouseEvent) => {
      event.stopPropagation();
      closeTab(tab);
    },
    [closeTab, tab],
  );

  return (
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
      <div className="flex items-center gap-4">
        <img
          src={`https://assets.hellogirls.info/portfolio/icons/${section}_favicon.gif`}
          alt={section}
        />
        <div
          className={clsx(
            "name-icon-container",
            "flex items-center",
            "hidden lg:block",
          )}
        >
          {capitalizeFirstLetter(section)}
        </div>
      </div>
      <button type="button" onClick={onTabClose}>
        <IconX
          size={16}
          className={clsx(isActiveTab ? "text-primary-600" : "text-base-500")}
        />
      </button>
    </div>
  );
}
