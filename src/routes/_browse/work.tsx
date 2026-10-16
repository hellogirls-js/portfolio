import {
	IconArrowRight,
	IconCircleCheck,
	IconCloudPause,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import {
	type MotionValue,
	motion,
	useScroll,
	useTransform,
} from "motion/react";
import { type ReactNode, useRef, useState, useLayoutEffect } from "react";
import { StackMarquee } from "@/components/Marquee";
import { PROJECTS, STACK_ICONS } from "@/utils/constants";

export const Route = createFileRoute("/_browse/work")({
	component: RouteComponent,
});

const STOPS = Array.from(
	{ length: PROJECTS.length + 1 },
	(_, k) => k / PROJECTS.length,
);

const HOLD = 0.2;
const HOLD_RADIUS = HOLD / (2 * PROJECTS.length);

const SCREENSHOT_DURATION = 0.3;

const panelOffset = (k: number) => `-${(k / (PROJECTS.length + 1)) * 100}%`;

function RouteComponent() {
	// i'm gonna make it a slideshow
	const pageSizeRef = useRef<HTMLDivElement | null>(null);
	const workPageScrollRef = useRef<HTMLDivElement | null>(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		if (pageSizeRef.current) {
			setWidth(pageSizeRef.current.offsetWidth);
			setHeight(pageSizeRef.current.offsetHeight);
		}
	}, []);

	const { scrollYProgress } = useScroll({ container: workPageScrollRef });

	const translateX = useTransform(
		scrollYProgress,
		STOPS.flatMap((p) => [
			Math.max(0, p - HOLD_RADIUS),
			Math.min(1, p + HOLD_RADIUS),
		]),
		STOPS.flatMap((_, k) => [panelOffset(k), panelOffset(k)]),
	);

	const scrollDistance = (PROJECTS.length + 1) * width - height;

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
				"scrollbar-thumb-base-100 scrollbar-track-base-300 scrollbar-gutter-stable",
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
						<div className={clsx("flex md:flex-col lg:flex-row", "size-full")}>
							<div className={clsx("flex flex-col gap-8", "basis-3/4", "p-8")}>
								<div id="header-container" className="relative">
									<h1
										className={clsx(
											"relative",
											"font-modern-header",
											"font-black text-9xl text-primary-500",
											"font-stretch-125%",
											"z-6",
										)}
									>
										Projects
									</h1>
									<div
										className={clsx(
											"absolute top-0 left-0",
											"font-modern-header",
											"font-black text-9xl text-secondary-50",
											"font-stretch-125%",
										)}
										style={{ transform: "translate(2px, 4px)" }}
									>
										Projects
									</div>
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
									<a
										href="https://hellogirls.info/projects"
										className={clsx(
											"text-primary-600",
											"font-modern-header font-bold",
										)}
										target="_blank"
										rel="noreferrer"
									>
										visit my project archive.
									</a>{" "}
									or my{" "}
									<a
										href="https://github.com/hellogirls-js"
										target="_blank"
										rel="noreferrer"
										className={clsx(
											"text-primary-600",
											"font-modern-header font-bold",
										)}
									>
										Github account
									</a>
									.
								</p>
							</div>
							<div
								className={clsx(
									"flex flex-col gap-8",
									"items-center justify-center",
									"bg-primary-500",
									"text-primary-50",
									"basis-1/4",
								)}
							>
								<motion.p
									className={clsx(
										"font-modern-header font-bold text-4xl font-stretch-expanded",
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
									<IconArrowRight size={64} />
								</motion.div>
							</div>
						</div>
					</div>
					{PROJECTS.map((project, index) => (
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
								className={clsx(
									"relative",
									"size-full",
									"flex flex-col items-center",
								)}
							>
								<div
									className={clsx("flex items-center gap-4", "h-full w-full")}
								>
									<div
										className={clsx(
											"flex flex-col items-center",
											"grow min-w-0",
											"pt-4 pl-4",
										)}
									>
										<h1
											className={clsx(
												"font-modern-header font-black",
												"text-6xl",
												index % 2 === 0
													? "text-primary-50"
													: "text-primary-600",
											)}
										>
											{project.name}
										</h1>
										<ProjectScreenshot progress={scrollYProgress} index={index}>
											<a href={project.url} target="_blank" rel="noreferrer">
												<img
													alt={project.name}
													src={`https://assets.hellogirls.info/portfolio/assets/${project.name?.toLowerCase().replaceAll(" ", "_")}_screenshot.jpg`}
													width={width > 1000 ? width - 640 : width}
													height="auto"
													className="max-w-full"
												/>
											</a>
										</ProjectScreenshot>
									</div>
									<div
										className={clsx(
											"flex w-1/3 flex-col justify-around",
											"gap-4",
										)}
									>
										<div
											className={clsx(
												"box-content",
												"flex flex-col gap-4",
												"basis-1/4",
												index % 2 === 0 ? "bg-white" : "bg-primary-600",
												index % 2 === 1 && "text-white",
												"p-12 pl-16",
												"rounded-l-full",
											)}
										>
											{project.description}
										</div>
										<div
											className={clsx(
												"flex justify-end items-center gap-4",
												"px-4",
											)}
										>
											<div
												className={clsx(
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
										"w-full h-16",
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
																	index % 2 === 0
																		? "text-white"
																		: "text-primary-500",
																	"font-modern-header font-black",
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
					))}
				</motion.div>
			</div>
		</div>
	);
}

function ProjectScreenshot({
	progress,
	index,
	children,
}: {
	progress: MotionValue<number>;
	index: number;
	children: ReactNode;
}) {
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
