import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { strapi } from "@strapi/client";

const SITE_URL = "https://about.hellogirls.info";
const SITE_NAME = "Hellogirls by Son";
const DIST = join(import.meta.dirname, "..", "dist");

const STRAPI_URL = process.env.VITE_STRAPI_URL;
if (!STRAPI_URL) throw new Error("VITE_STRAPI_URL is missing");

const strapiClient = strapi({ baseURL: `${STRAPI_URL}/api/` });

interface PostMeta {
  slug: string;
  title: string;
  summary: string | null;
  createdAt: string;
  updatedAt: string;
  coverImage: { url: string } | null;
}

async function fetchPublishedPosts() {
  const posts: PostMeta[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const result = await strapiClient.collection("blog-posts").find({
      fields: ["slug", "title", "summary", "createdAt", "updatedAt"],
      populate: { coverImage: { fields: ["url"] } },
      pagination: { page, pageSize: 100 },
    });
    posts.push(...(result.data as unknown as PostMeta[]));
    pageCount = result.meta.pagination?.pageCount ?? 1;
    page++;
  } while (page <= pageCount);

  return posts;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function buildHead(post: PostMeta) {
  const title = `${post.title} | ${SITE_NAME}`;
  const tags: [string, string][] = [
    ["og:title", title],
    ["og:type", "article"],
    ["og:url", `${SITE_URL}/blog/${post.slug}`],
    ["article:published_time", post.createdAt],
    ["article:modified_time", post.updatedAt],
    ["article:author", SITE_URL],
  ];
  if (post.summary) tags.push(["og:description", post.summary]);
  if (post.coverImage)
    tags.push(["og:image", STRAPI_URL + post.coverImage.url]);

  return [
    `<title>${escapeHtml(title)}</title>`,
    post.summary &&
      `<meta name="description" content="${escapeHtml(post.summary)}" />`,
    `<meta name="twitter:card" content="${post.coverImage ? "summary_large_image" : "summary"}" />`,
    ...tags.map(
      ([property, content]) =>
        `<meta property="${property}" content="${escapeHtml(content)}" />`,
    ),
  ]
    .filter(Boolean)
    .join("\n    ");
}

const template = await readFile(join(DIST, "index.html"), "utf8");
const posts = await fetchPublishedPosts();

for (const post of posts) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, "");
  if (post.summary) {
    html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/, "");
  }
  html = html.replace("</head>", `  ${buildHead(post)}\n  </head>`);

  const dir = join(DIST, "blog", post.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
}

console.log(`Prerendered meta tags for ${posts.length} blog posts`);
