import clsx from "clsx";

// START MENU
export const START_MENU_RIGHT_LINK = clsx(
  "text-sm",
  "text-base-50",
  "text-shadow-md",
  "cursor-default",
  "px-2",
  "hover:bg-secondary-500",
);
export const START_MENU_LEFT_LINK = clsx(
  `text-sm text-base-900 cursor-default text-shadow-lg text-shadow-black/3 px-2 py-0.5 hover:bg-secondary-500`,
);

// BLOG
export const BLOG_TAG_FILTER_BUTTON = clsx(
  "px-3 py-1",
  "rounded-full",
  "border border-base-200",
  "text-sm text-base-600",
  "cursor-pointer select-none",
  "hover:bg-base-100",
  "has-checked:bg-secondary-200 has-checked:border-secondary-500 has-checked:text-secondary-800",
  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-500",
);
