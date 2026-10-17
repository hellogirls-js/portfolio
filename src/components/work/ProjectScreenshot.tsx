import clsx from "clsx";
import { type MotionValue, motion, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { HOLD, HOLD_RADIUS, PROJECTS, STOPS } from "@/utils/constants";

export default function ProjectScreenshot({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: ReactNode;
}) {
  const SCREENSHOT_DURATION = 0.3;

  const end = STOPS[index + 1] - HOLD_RADIUS;
  const start = end - (SCREENSHOT_DURATION * (1 - HOLD)) / PROJECTS.length;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);

  return (
    <motion.div
      className={clsx("w-auto", "rounded-t-2xl", "mt-2", "overflow-hidden")}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}
