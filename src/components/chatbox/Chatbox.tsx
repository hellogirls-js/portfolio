import type { API } from "@strapi/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useWindowSize } from "react-use";
import { useWindows } from "@/stores/windows";
import type { ChatboxMessageInput } from "@/types/strapi";
import { strapiClient } from "@/utils/constants";
import Spinner from "../utils/Spinner";
import WindowButtons from "../window/WindowButtons";
import ChatboxForm from "./ChatboxForm";
import ChatboxMessages from "./ChatboxMessages";

export default function Chatbox({ window }: { window: IWindow }) {
	const { setActiveWindow, activeWindow } = useWindows();
	const queryClient = useQueryClient();
	const { width: screenWidth, height: screenHeight } = useWindowSize();

	const [currentPosition, setCurrentPosition] = useState({
		x:
			screenWidth <= 768
				? 8
				: screenWidth <= 1600
					? screenWidth * 0.6
					: screenWidth * 0.75,
		y: screenWidth <= 560 ? 0 : screenWidth <= 768 ? 16 : screenHeight * 0.25,
	});

	const chatboxRef = useRef<HTMLDivElement | null>(null);
	const lastPosition = useRef<{ x: number; y: number }>(currentPosition);

	useLayoutEffect(() => {
		const chatbox = chatboxRef.current;
		const parent = chatbox?.parentElement;
		if (!chatbox || !parent) return;

		const maxX = Math.max(0, parent.clientWidth - chatbox.offsetWidth);
		const maxY = Math.max(0, parent.clientHeight - chatbox.offsetHeight);

		setCurrentPosition((position) => ({
			x: Math.min(position.x, maxX),
			y: Math.min(position.y, maxY),
		}));
	}, [screenWidth, screenHeight]);

	const isActiveWindow = useMemo(() => {
		return activeWindow?.openedAt === window.openedAt;
	}, [activeWindow, window]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				chatboxRef.current &&
				!chatboxRef.current.contains(event.target as Node) &&
				isActiveWindow
			) {
				setActiveWindow(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isActiveWindow]);

	const { mutateAsync: submitChatboxForm, isPending: isSubmissionPending } =
		useMutation({
			mutationFn: async (data: ChatboxMessageInput) => {
				const messages = strapiClient.collection("chatbox-messages");
				const result = await messages.create(data);
				return result.data as API.Document & ChatboxMessageInput;
			},
			async onSuccess() {
				await queryClient.invalidateQueries({ queryKey: ["chatboxMsgs"] });
			},
		});

	return (
		<Draggable
			nodeRef={chatboxRef}
			handle="#chatbox-header"
			cancel=".window-buttons button"
			bounds="parent"
			position={currentPosition}
			onDrag={(_e, draggable) => {
				setCurrentPosition({ x: draggable.x, y: draggable.y });
				lastPosition.current = { x: draggable.lastX, y: draggable.lastY };
			}}
		>
			<div
				ref={chatboxRef}
				id="chatbox-ref"
				className={clsx(
					"absolute",
					"top-0 left-0",
					"[@media(max-width:384px)]:w-screen w-sm [@media(max-height:560px)]:h-[calc(100dvh-48px)] h-128",
					isActiveWindow ? "z-4" : "z-2",
				)}
			>
				<motion.div
					role="dialog"
					animate={{
						scale: window.minimized ? 0 : 1,
					}}
					onMouseDown={() => {
						setActiveWindow(window);
					}}
					onKeyDown={() => {
						setActiveWindow(window);
					}}
					id="chatbox-container"
					className={clsx(
						"size-full",
						"px-2 pb-2",
						"bg-browser-window",
						"backdrop-blur-sm",
						"rounded-sm",
						"shadow-2xl",
						"flex flex-col gap-1",
					)}
				>
					{isSubmissionPending && (
						<div
							id="chatbox-pending"
							className={clsx(
								"absolute top-0 left-0",
								"z-10",
								"w-full h-full",
								"pointer-events-none",
								"cursor-not-allowed",
								"flex items-center justify-center",
								"bg-base-900/50",
								"backdrop-blur-sm",
							)}
						>
							<Spinner size={32} />
						</div>
					)}
					<div
						id="chatbox-header"
						className={clsx("flex items-center", "cursor-default")}
					>
						<div className="text-sm">chatbox</div>
						<WindowButtons {...{ window }} />
					</div>
					<div
						id="chatbox-content"
						className={clsx("grow", "min-h-0", "flex flex-col gap-2")}
					>
						<div
							id="chatbox-messages-container"
							className={clsx(
								"grow",
								"min-h-0",
								"flex flex-col",
								"relative",
								"bg-base-50",
								"rounded-sm",
								"inset-shadow-sm",
							)}
						>
							<div
								id="chatbox-rules"
								className={clsx(
									"shrink",
									"pl-4 pr-2 pt-2 pb-4",
									"text-shadow-[0_0_4px] text-shadow-base-50",
									"bg-start",
									"text-sm",
									"shadow-lg",
								)}
							>
								<ul className="list-disc">
									<li>
										<strong>Absolutely NO</strong> inappropriate messages! They
										will be deleted immediately
									</li>
									<li>No spamming!</li>
								</ul>
							</div>
							<ChatboxMessages />
						</div>
						<ChatboxForm {...{ submitChatboxForm, isSubmissionPending }} />
					</div>
				</motion.div>
			</div>
		</Draggable>
	);
}
