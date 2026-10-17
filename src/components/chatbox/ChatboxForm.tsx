/** biome-ignore-all lint/correctness/noChildrenProp: work with tanstack form */
import type { API } from "@strapi/client";
import { useForm } from "@tanstack/react-form";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { Turnstile } from "../Turnstile";
import { useState } from "react";
import type { ChatboxMessageInput } from "@/types/strapi";

const MAX_MSG_LENGTH = 256;

export default function ChatboxForm({
	submitChatboxForm,
	isSubmissionPending,
}: {
	submitChatboxForm: UseMutateAsyncFunction<
		API.Document & ChatboxMessageInput,
		Error,
		ChatboxMessageInput,
		unknown
	>;
	isSubmissionPending: boolean;
}) {
	const [token, setToken] = useState<string | null>(null);

	const chatboxForm = useForm({
		defaultValues: {
			nickname: "",
			message: "",
		},
		onSubmit: async ({ value, formApi }) => {
			formApi.reset();
			if (!token) return;
			return await submitChatboxForm(value);
		},
	});

	return (
		<form
			onSubmit={(event) => {
				event.stopPropagation();
				event.preventDefault();
			}}
		>
			<Turnstile
				siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
				onVerify={setToken}
				onExpire={() => setToken(null)}
				onError={() => setToken(null)}
			/>
			<div
				id="chatbox-msg-items"
				className={clsx(
					"w-full",
					"flex flex-col gap-1",
					"p-1",
					"bg-base-50",
					"rounded-sm",
					"inset-shadow-sm",
				)}
			>
				<chatboxForm.Field
					name="nickname"
					validators={{
						onChange: ({ value }) => {
							if (!value?.length) {
								return "Please provide a nickname!";
							} else if (value.length < 3) {
								return "Nickname must be at least 3 characters long!";
							} else {
								return undefined;
							}
						},
					}}
					children={(field) => (
						<input
							type="text"
							name={field.name}
							required
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) => field.handleChange(event.target.value)}
							placeholder="Nickname"
							className={clsx(
								"w-[calc(100%-52px)]",
								"text-sm",
								"rounded-xs",
								"bg-transparent",
								"focus:outline-0",
								"border border-base-400",
								"p-1",
								field.state.meta.errors.length && "border border-red-700",
							)}
						/>
					)}
				/>
				<div
					id="chatbox-msg-box"
					className={clsx("basis-16", "flex items-center gap-1")}
				>
					<div id="chatbox-msg-container" className="relative size-full">
						<chatboxForm.Field
							name="message"
							validators={{
								onChange: ({ value }) => {
									if (!value?.length) {
										return "Please provide a message!";
									} else if (value.length > MAX_MSG_LENGTH) {
										return "Message is too long!";
									} else if (value.length < 3) {
										return "Message is too short!";
									} else {
										return undefined;
									}
								},
							}}
							children={(field) => (
								<>
									<textarea
										className={clsx(
											"grow",
											"border border-base-400",
											"size-full",
											"bg-transparent",
											"resize-none",
											"rounded-xs",
											"focus:outline-0",
											"text-sm",
											"pb-3",
											field.state.meta.errors.length && "border border-red-700",
										)}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(event) => field.handleChange(event.target.value)}
										maxLength={MAX_MSG_LENGTH}
									/>
									<div
										id="chatbox-msg-chara-count"
										className="absolute bottom-1 right-1 text-xs text-base-400"
									>
										{field.state.value.length} / {MAX_MSG_LENGTH}
									</div>
								</>
							)}
						/>
					</div>
					<button
						type="submit"
						disabled={isSubmissionPending || !token}
						onClick={() => {
							chatboxForm.handleSubmit();
						}}
						className={clsx(
							"bg-primary-button",
							"h-full w-12",
							"p-2",
							"rounded-sm",
							"text-sm",
							"text-base-50",
							"text-shadow-sm",
						)}
					>
						Send
					</button>
				</div>
			</div>
		</form>
	);
}
