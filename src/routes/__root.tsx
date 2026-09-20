import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import DesktopLoader from "@/components/desktop/DesktopLoader";
import Taskbar from "@/components/taskbar/Taskbar";
import { SOCIALS } from "@/utils/constants";
import { preloadImage } from "@/utils/functions";
import { useEffect, useRef } from "react";
import { useBrowser } from "@/stores/browser";

function RootLayout() {
  const { images } = Route.useLoaderData();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { tabs, switchTab, activeTabId } = useBrowser();

  const tabsRef = useRef<IBrowserTab[]>(tabs);

  useEffect(() => {
    if (tabs.length > tabsRef.current.length) {
      switchTab(tabs[tabs.length - 1].openedAt);
    }
  }, [tabs]);

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.openedAt === activeTabId);
    if (activeTab && pathname !== `/${activeTab.path}`) {
      navigate({ to: `/${activeTab.path}` });
    }
  }, [activeTabId]);

  return (
    <div
      id="home-container"
      className={clsx(
        "relative",
        "font-body",
        "size-full",
        "box-border",
        "flex",
        "flex-col",
        "bg-base-400",
      )}
    >
      <main className={clsx("basis-full", "relative")}>
        <div
          id="desktop-icons"
          className={clsx(
            "absolute",
            "size-full",
            "flex flex-col flex-wrap gap-10",
            "py-2 px-4",
          )}
        >
          {SOCIALS.map((social, index) => (
            <DesktopIcon
              key={social.name}
              {...{ social }}
              iconUrl={images[index]}
            />
          ))}
        </div>
        <AnimatePresence onExitComplete={() => console.log("complete exit")}>
          <Outlet key={pathname !== "/" ? 1 : 0} />
        </AnimatePresence>
      </main>
      <Taskbar />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  loader: async () => {
    const images = SOCIALS.map(
      (social) =>
        `https://assets.hellogirls.info/portfolio/icons/${social.name}.webp`,
    );
    images.push("https://assets.hellogirls.info/portfolio/assets/shortcut.ico");
    await Promise.all(images.map(preloadImage));
    return { images };
  },
  staleTime: Infinity,
  pendingComponent: DesktopLoader,
  pendingMs: 0,
  pendingMinMs: 5000,
});
