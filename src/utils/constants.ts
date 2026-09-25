import { strapi } from "@strapi/client";

console.log(
  import.meta.env.STRAPI_URL,
  import.meta.env.STRAPI_TOKEN,
  import.meta.env,
);

export const strapiClient = strapi({
  baseURL: import.meta.env.VITE_STRAPI_URL,
  auth: import.meta.env.VITE_STRAPI_TOKEN,
});

export const SOCIALS: Social[] = [
  {
    name: "twitter",
    url: "https://x.com/hellogirls_DEV",
  },
  {
    name: "instagram",
    url: "https://instagram.com/hellogirls.info",
  },
  {
    name: "bluesky",
    url: "https://bsky.app/profile/hellogirls.info",
  },
  {
    name: "github",
    url: "https://github.com/hellogirls-js",
  },
  {
    name: "coffee",
    url: "https://buymeacoffee.com/hellogirls",
  },
];
