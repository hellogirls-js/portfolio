import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { API } from "@strapi/client";
import { createFileRoute, notFound } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import type { BlogPost } from "@/types/strapi";
import { strapiClient } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/utils/functions";
import {
  IconBrandBluesky,
  IconBrandTwitter,
  IconCoffee,
  IconHash,
} from "@tabler/icons-react";
import ExternalLink from "@/components/ExternalLink";

export const Route = createFileRoute("/_browse/_blog/blog/$postSlug")({
  // Strapi's preview button links here with ?status=draft
  validateSearch: (search): { status?: "draft" } => ({
    status: search.status === "draft" ? "draft" : undefined,
  }),
  loaderDeps: ({ search }) => ({
    status: search.status ?? ("published" as const),
  }),
  loader: async ({ params, deps }) => {
    const result = await strapiClient.collection("blog-posts").find({
      status: deps.status,
      filters: { slug: { $eq: params.postSlug } },
      populate: {
        coverImage: {
          fields: ["url", "alternativeText", "width", "height", "formats"],
        },
      },
    });

    const post = result.data?.[0];
    if (!post) throw notFound();

    return post as API.Document & BlogPost;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();

  return (
    <div className={clsx("w-full", "relative", "bg-base-50 text-primary-900")}>
      <div
        id="post-header"
        className={clsx(
          "flex flex-col lg:flex-row gap-0",
          "w-full h-full min-h-full",
          "border-b-24 border-b-secondary-500",
        )}
      >
        {post.coverImage && (
          <div className={clsx("basis-1/2", "overflow-hidden")}>
            <img
              src={import.meta.env.VITE_STRAPI_URL + post.coverImage.url}
              alt={post.coverImage.alternativeText}
              className={clsx("w-full h-full", "object-fill", "select-none")}
            />
          </div>
        )}
        <div
          id="post-information"
          className={clsx(
            "basis-1/2",
            "relative isolate",
            "flex flex-col justify-around",
            "p-8",
          )}
        >
          <div
            aria-hidden
            className={clsx(
              "absolute inset-0 -z-10",
              "pattern-circuitboard bg-primary-100/70",
            )}
          />
          <div className="flex items-center flex-wrap gap-4 my-4">
            <h1
              className={clsx(
                "font-mono font-stretch-expanded font-black",
                "text-primary-600 text-5xl",
              )}
            >
              {post.title}
            </h1>
            {post.tag && (
              <div
                className={clsx(
                  "flex items-center gap-1",
                  "post-tag",
                  "bg-secondary-300 text-secondary-700",
                  "py-1 px-2",
                  "text-sm",
                  "rounded-full",
                  "w-auto",
                )}
              >
                <IconHash size={16} color="#849b27" />
                {capitalizeFirstLetter(post.tag)}
              </div>
            )}
          </div>
          <div className={clsx("my-4")}>{post.summary}</div>
          <div className={clsx("flex", "text-sm", "text-base-400", "gap-4")}>
            <div>{dayjs(post.createdAt).format("MMMM DD, YYYY @ h:mmA")}</div>
            {post.updatedAt &&
              !dayjs(post.updatedAt).isSame(post.createdAt) && (
                <div>
                  Last updated{" "}
                  {dayjs(post.updatedAt).format("MMMM DD, YYYY @ h:mmA")}
                </div>
              )}
          </div>
        </div>
      </div>
      <div
        id="post-content"
        className={clsx(
          "my-8 px-4 lg:px-0 pb-16",
          "w-full max-w-3xl m-auto",
          "text-lg",
          "font-modern-header",
        )}
      >
        <BlocksRenderer
          content={post.content}
          modifiers={{
            bold: ({ children }) => (
              <strong className="text-primary-600">{children}</strong>
            ),
            italic: ({ children }) => (
              <em className="text-primary-600">{children}</em>
            ),
            strikethrough: ({ children }) => (
              <del className="text-base-600">{children}</del>
            ),
          }}
          blocks={{
            paragraph: ({ children }) => (
              <p className="mb-8 leading-8">{children}</p>
            ),
            link: ({ children, url }) => {
              if (url.startsWith("/") || url.startsWith("#")) {
                return (
                  <a
                    href={url}
                    className="text-secondary-600 underline-offset-4 hover:text-primary-600"
                  >
                    {children}
                  </a>
                );
              } else {
                return (
                  <ExternalLink
                    to={url}
                    className="text-secondary-600 underline-offset-4 hover:text-primary-600"
                  >
                    {children}
                  </ExternalLink>
                );
              }
            },
            heading: ({ children, level }) => {
              const HeadingTag = `h${level}` as const;
              return (
                <HeadingTag
                  className={clsx(
                    "font-black font-stretch-expanded",
                    level === 1 && "text-4xl text-primary-500 mb-4 font-mono",
                    level === 2 && "text-3xl text-primary-600 mb-4 font-mono",
                    level === 3 && "text-2xl text-primary-500 mb-3",
                  )}
                >
                  {children}
                </HeadingTag>
              );
            },
            image: ({ image }) => (
              <figure className="w-full max-w-3xl my-12">
                <img
                  src={image.url}
                  alt={image.alternativeText ?? ""}
                  width={image.width}
                  height={image.height}
                  className="w-full rounded-lg"
                />
                {image.caption && (
                  <figcaption className="text-base text-base-400 italic mt-2">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ),
          }}
        />
      </div>
      <footer
        className={clsx(
          "bg-secondary-600",
          "text-base-50",
          "w-full",
          "py-4 px-16 mt-12",
        )}
      >
        <div className="flex items-center gap-8">
          <ExternalLink to="https://twitter.com/hellogirls_DEV">
            <IconBrandTwitter />
          </ExternalLink>
          <ExternalLink to="https://bsky.app/profile/hellogirls.info">
            <IconBrandBluesky />
          </ExternalLink>
          <ExternalLink to="https://buymeacoffee.com/hellogirls">
            <IconCoffee />
          </ExternalLink>
        </div>
      </footer>
    </div>
  );
}
