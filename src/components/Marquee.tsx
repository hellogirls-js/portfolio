import clsx from "clsx";
import { type AnimationPlaybackControls, motion, useAnimate } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

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

interface StackMarqueeProps {
  duration: number;
  hoverSpeed: number;
  children: ReactNode;
}

export function StackMarquee({
  duration,
  hoverSpeed,
  children,
}: StackMarqueeProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    controls.current = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      { duration, ease: "linear", repeat: Infinity },
    );
    return () => controls.current?.stop();
  }, [animate, scope, duration]);

  const setSpeed = (speed: number) => {
    if (controls.current) controls.current.speed = speed;
  };

  return (
    <div
      ref={scope}
      className={clsx("flex w-max")}
      onPointerEnter={() => setSpeed(hoverSpeed)}
      onPointerLeave={() => setSpeed(1)}
    >
      {children}
    </div>
  );
}
