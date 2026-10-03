import type { API } from "@strapi/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useWindows } from "@/stores/windows";
import { strapiClient } from "@/utils/constants";
import Spinner from "../utils/Spinner";
import WindowButtons from "../window/WindowButtons";
import ChatboxForm from "./ChatboxForm";
import ChatboxMessages from "./ChatboxMessages";
import { motion } from "motion/react";

export default function Chatbox({ window }: { window: IWindow }) {
	const { setActiveWindow, windows, activeWindow } = useWindows();
	const queryClient = useQueryClient();

	const chatboxRef = useRef<HTMLDivElement | null>(null);

	const chatboxWindowIndex = useMemo(() => {
		return Array.from(windows.values()).findIndex(
			(w) => window.openedAt === w.openedAt,
		);
	}, [windows, window]);

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

	const {
		mutateAsync: submitChatboxForm,
		error: submitChatboxError,
		isPending: isSubmissionPending,
	} = useMutation({
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
		<Draggable nodeRef={chatboxRef} handle="#chatbox-header" bounds="parent">
			<div
				ref={chatboxRef}
				id="chatbox-ref"
				className={clsx(
					"absolute",
					"top-1/4 right-1/4",
					"w-sm h-128",
					isActiveWindow ? "z-4" : "z-2",
				)}
			>
				<motion.div
					role="dialog"
					animate={{ scale: window.minimized ? 0 : 1 }}
					style={{
						transformOrigin: `${(chatboxWindowIndex + 1) * 4}vw 94vh`,
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
						className={clsx("grow", "flex flex-col gap-2")}
					>
						<div
							id="chatbox-messages-container"
							className={clsx(
								"grow",
								"flex flex-col",
								"relative",
								"bg-linear-to-b from-secondary-400 to-30% to-base-50",
								"p-2",
								"rounded-sm",
								"inset-shadow-sm",
							)}
						>
							<div
								id="chatbox-rules"
								className="pl-4 pb-2 text-shadow-[0_0_4px] text-shadow-base-50"
							>
								<ul className="list-disc">
									<li>
										<strong>absolutely NO</strong> inappropriate messages!! they
										will be deleted immediately
									</li>
									<li>no spamming!</li>
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
