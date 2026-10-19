import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import clsx from "clsx";
import { type MotionValue, motion } from "motion/react";
import { PROJECTS, STACK_ICONS } from "@/utils/constants";
import ExternalLink from "../ExternalLink";
import { StackMarquee } from "../Marquee";
import ProjectScreenshot from "./ProjectScreenshot";

export default function ProjectItem({
  project,
  index,
  width,
  height,
  scrollYProgress,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  width: number;
  height: number;
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div
      key={project.name}
      className={clsx(
        "work-item",
        index % 2 === 0 && "bg-primary-500",
        "overflow-hidden",
      )}
      style={{ width, height }}
    >
      <div
        className={clsx("relative", "size-full", "flex flex-col items-center")}
      >
        <div
          className={clsx(
            "flex flex-col lg:flex-row items-center lg:gap-4",
            "h-full w-full",
          )}
        >
          <div
            className={clsx(
              "flex flex-col items-center justify-between",
              "grow h-full min-w-0",
              "pt-4 lg:pl-4",
            )}
          >
            <h1
              className={clsx(
                "font-modern-header font-black",
                "text-4xl lg:text-6xl",
                "uppercase",
                index % 2 === 0 ? "text-primary-50" : "text-primary-600",
              )}
            >
              {project.name}
            </h1>
            <ProjectScreenshot progress={scrollYProgress} index={index}>
              <ExternalLink to={project.url}>
                <img
                  alt={project.name}
                  src={`https://assets.hellogirls.info/portfolio/assets/${project.name?.toLowerCase().replaceAll(" ", "_")}_screenshot.jpg`}
                  width={width > 1000 ? width - 640 : width}
                  height="auto"
                  className="max-w-full"
                />
              </ExternalLink>
            </ProjectScreenshot>
          </div>
          <div
            className={clsx(
              "flex lg:w-1/3 flex-col justify-around",
              "lg:gap-4",
            )}
          >
            <div
              className={clsx(
                "box-content",
                "flex flex-col items-end gap-4",
                "lg:basis-1/4",
                index % 2 === 0 ? "bg-white" : "bg-primary-600",
                index % 2 === 1 && "text-white",
                "p-2 lg:p-12 lg:pl-16",
                "lg:rounded-l-full",
                "text-sm lg:text-base",
              )}
            >
              {project.description}
            </div>
            <div
              className={clsx(
                "flex gap-4 items-center justify-center",
                "px-4",
                "hidden lg:flex",
              )}
            >
              <div
                className={clsx(
                  "shrink",
                  "w-auto",
                  "font-modern-header font-black",
                  "text-4xl",
                  index % 2 === 0 ? "text-white" : "text-primary-600",
                )}
              >
                {index === PROJECTS.length - 1 ? "DONE" : "NEXT"}
              </div>
              <motion.div
                className={clsx(
                  "rounded-full",
                  "p-2",
                  "w-16",
                  index % 2 === 0
                    ? "bg-primary-50 text-primary-500"
                    : "bg-primary-600 text-secondary-300",
                )}
              >
                {index === PROJECTS.length - 1 ? (
                  <IconCircleCheck size={48} />
                ) : (
                  <IconArrowRight size={48} />
                )}
              </motion.div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "relative",
            "w-full h-12 lg:h-16",
            "flex items-center",
            "overflow-hidden",
            index % 2 === 0 ? "bg-secondary-600" : "bg-white",
          )}
        >
          <StackMarquee duration={40} hoverSpeed={0.15}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={clsx("flex items-center gap-8", "pr-8")}
                aria-hidden={copy === 1}
              >
                {Array.from({ length: 4 }, () => project.stack ?? [])
                  .flat()
                  .map((stackItem, i) => {
                    const StackIcon = STACK_ICONS[stackItem];
                    return (
                      <div
                        key={`${stackItem}-${
                          // biome-ignore lint/suspicious/noArrayIndexKey: who gaf
                          i
                        }`}
                        className={clsx(
                          "flex items-center gap-0.5",
                          "whitespace-nowrap",
                          index % 2 === 0 ? "text-white" : "text-primary-500",
                          "font-modern-header font-black",
                          "text-sm lg:text-base",
                          "uppercase",
                        )}
                      >
                        <StackIcon size={24} />
                        {stackItem}
                      </div>
                    );
                  })}
              </div>
            ))}
          </StackMarquee>
        </div>
      </div>
    </div>
  );
}
