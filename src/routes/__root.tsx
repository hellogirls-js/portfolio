import {
  createRootRoute,
  Outlet,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import clsx from "clsx";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import Taskbar from "@/components/taskbar/Taskbar";
import { SOCIALS } from "@/utils/constants";
import { preloadImage } from "@/utils/functions";
import DesktopLoader from "@/components/desktop/DesktopLoader";
import { AnimatePresence, motion } from "motion/react";

function RootLayout() {
  const { images } = Route.useLoaderData();
  const { pathname } = useLocation();

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
        <AnimatePresence>
          {pathname !== "/" && (
            <motion.div
              exit={{ scale: 0 }}
              id="page-container"
              className={clsx("absolute", "z-2", "size-full")}
            >
              <Outlet />
            </motion.div>
          )}
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
  pendingComponent: DesktopLoader,
  pendingMs: 0,
  pendingMinMs: 1000,
});
