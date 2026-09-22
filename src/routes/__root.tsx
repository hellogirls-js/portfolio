import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import DesktopLoader from "@/components/desktop/DesktopLoader";
import Taskbar from "@/components/taskbar/Taskbar";
import { usePendingUI } from "@/hooks/usePendingUI";
import { useBrowser } from "@/stores/browser";
import { useWindows } from "@/stores/windows";
import { SOCIALS } from "@/utils/constants";
import { preloadImage } from "@/utils/functions";

function RootLayout() {
  const { images } = Route.useLoaderData();
  const { pathname } = useLocation();
  const isPending = usePendingUI(5000);
  console.log({ isPending });
  const navigate = useNavigate();
  const { tabs, switchTab, activeTabId, browserWindow } = useBrowser();
  const { windows, closeWindow } = useWindows();

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

  useEffect(() => {
    if (!browserWindow) {
      const hasBrowserWindow = windows.find(
        (window) => window.title === "firefox",
      );
      if (hasBrowserWindow) {
        closeWindow(hasBrowserWindow);
      }
    }
  }, [browserWindow, windows]);

  if (isPending) {
    return <DesktopLoader />;
  }

  return (
    <AnimatePresence mode="wait">
      {isPending ? (
        <DesktopLoader key="pending" />
      ) : (
        <motion.div
          key="loaded"
          id="home-container"
          initial={{ filter: "brightness(0)" }}
          animate={{
            filter: "brightness(1)",
            transition: { duration: 0.8 },
            transitionEnd: { filter: "none" },
          }}
          className={clsx(
            "relative",
            "isolate",
            "font-body",
            "w-full h-screen",
            "box-border",
            "flex",
            "flex-col",
            "bg-[url('https://assets.hellogirls.info/portfolio/wallpaper.jpg')] bg-cover bg-fixed",
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
            <AnimatePresence
              onExitComplete={() => console.log("complete exit")}
            >
              <Outlet key={pathname !== "/" ? 1 : 0} />
            </AnimatePresence>
          </main>
          <Taskbar />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  loader: async () => {
    const images = SOCIALS.flatMap(
      (social) =>
        `https://assets.hellogirls.info/portfolio/icons/${social.name}.png`,
    );
    images.push("https://assets.hellogirls.info/portfolio/assets/shortcut.ico");
    await Promise.all(images.map(preloadImage));
    return { images };
  },
  staleTime: Infinity,
});
