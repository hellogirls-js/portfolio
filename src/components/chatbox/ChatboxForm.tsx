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
			if (import.meta.env.PROD && !token) return;
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
						<div className="relative">
							<input
								id="chatbox-name-field"
								type="text"
								name={field.name}
								value={field.state.value}
								onFocus={() => {
									field.setMeta((prev) => ({
										...prev,
										errorMap: { ...prev.errorMap, onChange: undefined },
									}));
								}}
								onBlur={() => {
									field.handleBlur();
									field.setMeta((prev) => ({
										...prev,
										errorMap: { ...prev.errorMap, onChange: undefined },
									}));
								}}
								onChange={(event) => field.handleChange(event.target.value)}
								placeholder="Nickname"
								className={clsx(
									"w-[calc(100%-52px)]",
									"text-sm",
									"rounded-xs",
									"bg-transparent",
									"focus:outline-0",
									"border border-base-300",
									"inset-shadow-xs",
									"p-1",
									field.state.meta.errors.length && "border border-red-700",
								)}
							/>
							{field.state.meta.errors.length > 0 && (
								<div
									className={clsx(
										"textarea-error-tooltip",
										"w-max max-w-48",
										"p-1 px-2",
										"absolute bottom-full mb-1 left-1/4 z-10",
										"pointer-events-none",
										"rounded-sm",
										"bg-red-800/80",
										"text-base-50",
										"shadow-lg",
									)}
								>
									{field.state.meta.errors[0]}
								</div>
							)}
						</div>
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
								<div
									className={clsx("textarea-container", "relative", "h-full")}
								>
									<textarea
										id="chatbox-message-field"
										className={clsx(
											"grow",
											"border border-base-300",
											"size-full h-full",
											"bg-transparent",
											"resize-none",
											"rounded-xs",
											"focus:outline-0",
											"text-sm",
											"pb-3",
											"inset-shadow-xs",
											field.state.meta.errors.length && "border border-red-700",
										)}
										value={field.state.value}
										onFocus={() => {
											field.setMeta((prev) => ({
												...prev,
												errorMap: { ...prev.errorMap, onChange: undefined },
											}));
										}}
										onBlur={() => {
											field.handleBlur();
											field.setMeta((prev) => ({
												...prev,
												errorMap: { ...prev.errorMap, onChange: undefined },
											}));
										}}
										onChange={(event) => field.handleChange(event.target.value)}
										maxLength={MAX_MSG_LENGTH}
									/>
									{field.state.meta.errors.length > 0 && (
										<div
											className={clsx(
												"textarea-error-tooltip",
												"w-max max-w-48",
												"p-1 px-2",
												"absolute top-full mt-1 left-1/4 z-10",
												"pointer-events-none",
												"rounded-sm",
												"bg-red-800/80",
												"text-base-50",
												"shadow-lg",
											)}
										>
											{field.state.meta.errors[0]}
										</div>
									)}
									<div
										id="chatbox-msg-chara-count"
										className="absolute bottom-1 right-1 text-xs text-base-400"
									>
										<span id="cbm-count">{field.state.value.length}</span> /{" "}
										{MAX_MSG_LENGTH}
									</div>
								</div>
							)}
						/>
					</div>
					<button
						type="submit"
						disabled={
							isSubmissionPending || (import.meta.env.PROD ? !token : false)
						}
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
							"disabled:opacity-50",
						)}
					>
						Send
					</button>
				</div>
			</div>
		</form>
	);
}
