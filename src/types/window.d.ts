export {};

declare global {
	interface Window {
		turnstile?: typeof turnstile;
	}
}
