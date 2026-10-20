import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import Chatbox from "@/components/chatbox/Chatbox";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import DesktopLoader from "@/components/desktop/DesktopLoader";
import Taskbar from "@/components/taskbar/Taskbar";
import { usePendingUI } from "@/hooks/usePendingUI";
import { useBrowser } from "@/stores/browser";
import { useWindows } from "@/stores/windows";
import { SOCIALS } from "@/utils/constants";
import { preloadImage } from "@/utils/functions";
import "@/index.css";

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  const { images } = Route.useLoaderData();
  const { pathname } = useLocation();
  const isPending = usePendingUI(
    typeof window !== "undefined" && window.skipDesktopLoader ? 0 : 5000,
  );
  const navigate = useNavigate();
  const { tabs, switchTab, activeTabId, browserWindow } = useBrowser();
  const { windows, closeWindow, createNewWindow } = useWindows();

  const tabsRef = useRef<IBrowserTab[]>(tabs);

  const isChatboxOpen = useMemo(() => {
    return windows.get("chatbox");
  }, [windows]);

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
    if (!windows.has("chatbox")) {
      createNewWindow({
        title: "chatbox",
        file: "chatbox.gif",
        openedAt: Date.now(),
        shouldMaximize: false,
        maximized: false,
        minimized: false,
      });
    }
  }, []);

  useEffect(() => {
    if (!browserWindow) {
      const hasBrowserWindow = windows.get("firefox");
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
            "w-full h-dvh",
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
            {isChatboxOpen && <Chatbox window={isChatboxOpen} />}
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
  head: () => ({
    links: [
      {
        rel: "icon",
        href: "https://assets.hellogirls.info/portfolio/icons/blog_favicon.gif",
      },
    ],
    scripts: [
      {
        src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
        async: true,
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        title: "Hellogirls: By Son",
      },
      {
        name: "description",
        content:
          "Son's portfolio website rebuilt after 3 years of training and honing her design engineering skills. Send a message in the chatbox and read her blog!",
      },
      {
        name: "keywords",
        content:
          "JavaScript, React, Portfolio, Frontend Developer, Design Engineer, Full-Stack Developer",
      },
      {
        name: "author",
        content: "Sonny",
      },
      {
        property: "og:site_name",
        content: "About Son",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
    ],
  }),
  component: RootLayout,
  loader: async () => {
    const images = SOCIALS.flatMap(
      (social) =>
        `https://assets.hellogirls.info/portfolio/icons/${social.name}.png`,
    );
    images.push("https://assets.hellogirls.info/portfolio/assets/shortcut.ico");
    images.push("https://assets.hellogirls.info/portfolio/wallpaper.jpg");

    if (typeof window !== "undefined") {
      await Promise.all(images.map(preloadImage));
    }
    return { images };
  },
  shellComponent: RootDocument,
  staleTime: Infinity,
});
