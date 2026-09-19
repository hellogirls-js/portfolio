import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({ component: RouteComponent });

function RouteComponent() {
  return (
    <motion.div className="size-full absolute top-0 left-0 pointer-events-none"></motion.div>
  );
}
