import type { API } from "@strapi/client";
import { IconAlertTriangle, IconSearch } from "@tabler/icons-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useState } from "react";
import Masonry from "react-responsive-masonry";
import { useDebounce } from "react-use";
import BlogPostItem from "@/components/blog/BlogPostItem";
import type { BlogPost, BlogPostTag } from "@/types/strapi";
import { strapiClient } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/utils/functions";
import { BLOG_TAG_FILTER_BUTTON } from "@/utils/styles";
import BlogLoadingScreen from "@/components/blog/BlogLoadingScreen";

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
    return <BlogLoadingScreen />;
  }

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8",
          "w-full",
          "py-2 px-8",
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
          <label className={BLOG_TAG_FILTER_BUTTON}>
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
            <label key={tag} className={BLOG_TAG_FILTER_BUTTON}>
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
          "w-full h-auto m-auto mt-4 px-4",
          areBlogPostsStale && "opacity-50",
        )}
      >
        <Masonry columnsCount={4} gutter="8px">
          {blogPosts?.map((post) => (
            <BlogPostItem {...{ post }} key={post.documentId} />
          ))}
        </Masonry>
      </ul>
    </div>
  );
}
