import clsx from "clsx";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Marquee({ children, speed = 10, className }: MarqueeProps) {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className={clsx("inline-block w-full", className)}
        animate={{ x: ["100%", "-15%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
