import type { API } from "@strapi/client";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import type { BlogPost } from "@/types/strapi";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function BlogPostItem({
  post,
}: {
  post: API.Document & BlogPost;
}) {
  return (
    <Link to="/blog/$postSlug" params={{ postSlug: post.slug }}>
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
          {post.title}
        </h3>
        <div>{post.summary}</div>
        <span className={clsx("text-sm text-base-400")}>
          {dayjs(post.createdAt).format("MMM D, YYYY")}
        </span>
      </li>
    </Link>
  );
}
