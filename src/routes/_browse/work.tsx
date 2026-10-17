import { IconArrowRight } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useLayoutEffect } from "react";
import ExternalLink from "@/components/ExternalLink";
import ProjectItem from "@/components/work/ProjectItem";
import { HOLD_RADIUS, PROJECTS, STOPS } from "@/utils/constants";

export const Route = createFileRoute("/_browse/work")({
  component: RouteComponent,
});

const panelOffset = (k: number) => `-${(k / (PROJECTS.length + 1)) * 100}%`;

function RouteComponent() {
  // i'm gonna make it a slideshow
  const pageSizeRef = useRef<HTMLDivElement | null>(null);
  const workPageScrollRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = pageSizeRef.current;
    if (!el) return;

    const measure = () => {
      setWidth(el.offsetWidth);
      setHeight(el.offsetHeight);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollDistance = (PROJECTS.length + 1) * width - height;

  // motion reports progress as 1 when the scroll length is 0 (before we've
  // measured), so derive progress from scrollY ourselves
  const { scrollY } = useScroll({ container: workPageScrollRef });
  const scrollYProgress = useTransform(scrollY, (y) =>
    scrollDistance > 0 ? Math.min(1, Math.max(0, y / scrollDistance)) : 0,
  );

  const translateX = useTransform(
    scrollYProgress,
    STOPS.flatMap((p) => [
      Math.max(0, p - HOLD_RADIUS),
      Math.min(1, p + HOLD_RADIUS),
    ]),
    STOPS.flatMap((_, k) => [panelOffset(k), panelOffset(k)]),
  );

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.14],
    [1, 1, 0],
  );

  return (
    <div
      ref={workPageScrollRef}
      className={clsx(
        "relative",
        "page-container",
        "box-border",
        "size-full",
        "overflow-y-auto",
        "overflow-x-hidden",
        "snap-y snap-mandatory",
      )}
    >
      <div
        id="work-page-size-ref"
        className="size-full absolute top-0 left-0 z-1 pointer-events-none"
        ref={pageSizeRef}
      />
      <div
        id="work-page"
        className={clsx("w-full", "relative")}
        style={{ height: (PROJECTS.length + 1) * width }}
      >
        {STOPS.map((p) => (
          <div
            key={p}
            aria-hidden
            className={clsx("absolute left-0", "w-full h-px", "snap-start")}
            style={{ top: p * scrollDistance }}
          />
        ))}
        <motion.div
          id="work-content-container"
          className={clsx(
            "flex items-center",
            "bg-secondary-300",
            "sticky top-0 left-0",
          )}
          style={{
            width: (PROJECTS.length + 1) * width,
            height,
            translateX,
          }}
        >
          <div
            className={clsx(
              "work-item",
              "overflow-hidden",
              "bg-secondary-300",
              "relative",
            )}
            style={{ width, height }}
          >
            <div className={clsx("flex flex-col lg:flex-row", "size-full")}>
              <div className={clsx("flex flex-col gap-8", "basis-3/4", "p-8")}>
                <div id="header-container" className="relative">
                  <h1
                    className={clsx(
                      "relative",
                      "font-modern-header",
                      "uppercase",
                      "font-black text-4xl lg:text-9xl text-primary-500",
                      "font-stretch-125%",
                      "z-6",
                    )}
                  >
                    Projects
                  </h1>
                </div>
                <p
                  className={clsx(
                    "font-website",
                    "bg-base-50",
                    "p-8",
                    "text-lg",
                    "rounded-lg",
                  )}
                >
                  These are the projects I'm most proud of! They demonstrate my
                  abilities as a frontend developer and design engineer. For a
                  full list of websites I've made,{" "}
                  <ExternalLink
                    to="https://hellogirls.info/projects"
                    className={clsx(
                      "text-primary-600",
                      "font-modern-header font-bold",
                    )}
                  >
                    visit my project archive
                  </ExternalLink>{" "}
                  or my{" "}
                  <ExternalLink
                    to="https://github.com/hellogirls-js"
                    className={clsx(
                      "text-primary-600",
                      "font-modern-header font-bold",
                    )}
                  >
                    Github account
                  </ExternalLink>
                  .
                </p>
              </div>
              <div
                className={clsx(
                  "flex flex-row lg:flex-col gap-8",
                  "items-center justify-center",
                  "bg-primary-500",
                  "text-primary-50",
                  "basis-1/4",
                )}
              >
                <motion.p
                  className={clsx(
                    "font-modern-header font-bold text-2xl lg:text-4xl font-stretch-expanded",
                  )}
                  style={{ opacity: scrollOpacity }}
                >
                  SCROLL
                </motion.p>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1,
                    ease: "circInOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  style={{ opacity: scrollOpacity }}
                  className={clsx(
                    "rounded-full",
                    "p-4",
                    "bg-primary-50 text-primary-500",
                  )}
                >
                  <IconArrowRight size={width >= 768 ? 64 : 24} />
                </motion.div>
              </div>
            </div>
          </div>
          {PROJECTS.map((project, index) => (
            <ProjectItem
              key={project.name}
              {...{ project, index, width, height, scrollYProgress }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
