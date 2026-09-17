import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import DesktopLoader from "@/components/desktop/DesktopLoader";
import { SOCIALS } from "@/utils/constants";
import { preloadImage } from "@/utils/functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
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
  pendingMinMs: 300,
});

function RouteComponent() {
  const { images } = Route.useLoaderData();

  return (
    <div
      id="desktop_icons"
      className={clsx(
        "relative",
        "w-full h-full",
        "py-2 px-4",
        "flex flex-col flex-wrap gap-10",
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
  );
}
