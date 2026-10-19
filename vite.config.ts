import { fileURLToPath, URL } from "node:url";
import { strapi } from "@strapi/client";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

async function getBlogPostPages(strapiUrl: string) {
  const strapiClient = strapi({ baseURL: `${strapiUrl}/api/` });
  const slugs: string[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const result = await strapiClient.collection("blog-posts").find({
      fields: ["slug"],
      pagination: { page, pageSize: 100 },
    });
    slugs.push(...result.data.map((post) => post.slug as string));
    pageCount = result.meta.pagination?.pageCount ?? 1;
    page++;
  } while (page <= pageCount);

  return slugs.map((slug) => ({ path: `/blog/${slug}` }));
}

// https://vite.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const pages =
    command === "build" ? await getBlogPostPages(env.VITE_STRAPI_URL) : [];

  return {
    plugins: [
      tailwindcss(),
      tanstackStart({
        pages,
        prerender: { enabled: true, crawlLinks: true },
        // fallback page for routes that weren't prerendered (e.g. draft previews)
        spa: { enabled: true, maskPath: "/?shell" },
      }),
      react(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    ssr: {
      noExternal: ["react-use"],
    },
  };
});
