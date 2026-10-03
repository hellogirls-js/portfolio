import { useEffect, useRef } from "react";

interface TurnstileProps {
	siteKey: string;
	onVerify: (token: string) => void;
	onExpire?: () => void;
	onError?: () => void;
	theme?: "light" | "dark" | "auto";
}

export function Turnstile({
	siteKey,
	onVerify,
	onExpire,
	onError,
	theme = "auto",
}: TurnstileProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);

	const onVerifyRef = useRef(onVerify);
	const onExpireRef = useRef(onExpire);
	const onErrorRef = useRef(onError);
	onVerifyRef.current = onVerify;
	onExpireRef.current = onExpire;
	onErrorRef.current = onError;

	useEffect(() => {
		let cancelled = false;
		let pollId: number | undefined;

		const renderWidget = () => {
			if (cancelled || !containerRef.current || !window.turnstile) return;
			if (widgetIdRef.current) return; // already rendered

			widgetIdRef.current =
				window.turnstile.render(containerRef.current, {
					sitekey: siteKey,
					theme,
					callback: (token) => onVerifyRef.current(token),
					"expired-callback": () => onExpireRef.current?.(),
					"error-callback": () => onErrorRef.current?.(),
				}) ?? null;
		};

		if (window.turnstile) {
			renderWidget();
		} else {
			pollId = window.setInterval(() => {
				if (window.turnstile) {
					window.clearInterval(pollId);
					renderWidget();
				}
			}, 100);
		}

		return () => {
			cancelled = true;
			if (pollId) window.clearInterval(pollId);
			if (widgetIdRef.current && window.turnstile) {
				window.turnstile.remove(widgetIdRef.current);
				widgetIdRef.current = null;
			}
		};
	}, [siteKey, theme]);

	return <div ref={containerRef} />;
}
