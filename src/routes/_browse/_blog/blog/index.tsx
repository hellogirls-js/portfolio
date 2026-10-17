import type { API } from "@strapi/client";
import { IconAlertTriangle, IconSearch } from "@tabler/icons-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import Masonry from "react-responsive-masonry";
import { BeatLoader } from "react-spinners";
import { useDebounce } from "react-use";
import type { BlogPost, BlogPostTag } from "@/types/strapi";
import { strapiClient } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/utils/functions";

const BLOG_POST_TAGS: BlogPostTag[] = ["coding", "cosplay", "review", "life"];

export const Route = createFileRoute("/_browse/_blog/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filteredTag, setFilteredTag] = useState<BlogPostTag | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery.trim());
    },
    300,
    [searchQuery],
  );

  const {
    data: blogPosts,
    isLoading: areBlogPostsLoading,
    isPlaceholderData: areBlogPostsStale,
    error: blogPostsError,
  } = useQuery({
    queryKey: ["blogPosts", filteredTag, debouncedSearchQuery],
    queryFn: async () => {
      try {
        const allBlogPosts = strapiClient.collection("blog-posts");
        const blogPostsToDisplay = await allBlogPosts.find({
          sort: "updatedAt:desc",
          status: "published",
          filters: {
            ...(filteredTag && { tag: { $eq: filteredTag } }),
            ...(debouncedSearchQuery && {
              title: { $containsi: debouncedSearchQuery },
            }),
          },
          populate: {
            coverImage: {
              fields: ["url", "alternativeText", "width", "height", "formats"],
            },
          },
        });

        if (!blogPostsToDisplay.data) return null;

        return blogPostsToDisplay.data as Array<API.Document & BlogPost>;
      } catch (error) {
        const e: Error = error as Error;
        console.error(e.name);
        if (e.name === "HTTPForbiddenError") {
          throw new Error("Could not retrieve blog posts");
        }
      }
    },
    placeholderData: keepPreviousData,
  });

  if (areBlogPostsLoading) {
    return (
      <div id="page-container" className={clsx("bg-base-50", "size-full")}>
        <div
          className={clsx(
            "m-auto",
            "w-full max-w-3xl h-full",
            "flex flex-col items-center justify-center gap-8",
          )}
        >
          {}
          <h1
            className={clsx(
              "font-modern-header font-black uppercase font-stretch-expanded",
              "text-base-600 text-5xl",
            )}
          >
            Loading
          </h1>

          <BeatLoader
            color="#2e39b8"
            className={clsx("text-primary-500", "fill-primary-500")}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8",
          "w-full",
          "py-2 px-4",
        )}
      >
        <div
          id="search-blogs"
          className={clsx(
            "grow",
            "flex items-center gap-4",
            "border border-base-300",
            "p-2",
            "rounded-sm",
          )}
        >
          <div id="search-icon">
            <IconSearch className={"text-base-300"} />
          </div>
          <input
            type="text"
            placeholder="Search for Articles"
            className={clsx("focus:outline-none")}
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.currentTarget.value);
            }}
          />
        </div>
        <div
          id="filter-tags"
          className={clsx("flex flex-wrap lg:flex-nowrap items-center gap-2")}
        >
          <label
            className={clsx(
              "px-3 py-1",
              "rounded-full",
              "border border-base-300",
              "text-sm text-base-600",
              "cursor-pointer select-none",
              "hover:bg-base-100",
              "has-checked:bg-secondary-200 has-checked:border-secondary-500 has-checked:text-secondary-800",
              "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-500",
            )}
          >
            <input
              type="radio"
              name="tag"
              className="sr-only"
              checked={filteredTag === undefined}
              onChange={() => {
                setFilteredTag(undefined);
              }}
            />
            All
          </label>
          {BLOG_POST_TAGS.map((tag) => (
            <label
              key={tag}
              className={clsx(
                "px-3 py-1",
                "rounded-full",
                "border border-base-300",
                "text-sm text-base-600",
                "cursor-pointer select-none",
                "hover:bg-base-100",
                "has-checked:bg-secondary-200 has-checked:border-secondary-500 has-checked:text-secondary-800",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-500",
              )}
            >
              <input
                type="radio"
                name="tag"
                value={tag}
                className="sr-only"
                checked={filteredTag === tag}
                onChange={() => {
                  setFilteredTag(tag);
                }}
              />
              {capitalizeFirstLetter(tag)}
            </label>
          ))}
        </div>
      </div>
      {blogPostsError && (
        <div
          className={clsx(
            "flex items-center gap-2",
            "bg-red-200 text-red-900",
            "py-2 px-4 mt-4",
            "rounded-lg",
          )}
        >
          <IconAlertTriangle size={24} color="#82181a" />
          {blogPostsError.message.includes("undefined")
            ? "Could not retrieve blog posts"
            : blogPostsError.message}
        </div>
      )}
      <ul
        className={clsx(
          "w-full h-auto m-auto mt-4",
          areBlogPostsStale && "opacity-50",
        )}
      >
        <Masonry columnsCount={4} gutter="8px">
          {blogPosts?.map((post) => {
            return (
              <li
                key={post.documentId}
                className={clsx(
                  "p-4",
                  "rounded-lg",
                  "max-w-96",
                  "flex flex-col items-start gap-2",
                  "hover:bg-base-100",
                )}
              >
                {post.coverImage && (
                  <img
                    src={import.meta.env.VITE_STRAPI_URL + post.coverImage.url}
                    width={384}
                    height="auto"
                    alt={post.coverImage.alternativeText}
                    className="rounded-lg border border-base-200"
                  />
                )}
                {post.tag && (
                  <div
                    className={clsx(
                      "post-tag",
                      "bg-secondary-300 text-secondary-800",
                      "py-1 px-2",
                      "text-sm",
                      "rounded-full",
                      "w-auto",
                    )}
                  >
                    {capitalizeFirstLetter(post.tag)}
                  </div>
                )}
                <h3
                  className={clsx(
                    "font-mono font-bold",
                    "text-2xl",
                    "text-primary-500",
                  )}
                >
                  <Link to="/blog/$postSlug" params={{ postSlug: post.slug }}>
                    {post.title}
                  </Link>
                </h3>
                <div>{post.summary}</div>
                <span className={clsx("text-sm text-base-400")}>
                  {dayjs(post.createdAt).format("MMM D, YYYY")}
                </span>
              </li>
            );
          })}
        </Masonry>
      </ul>
    </div>
  );
}
