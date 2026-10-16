import { strapiClient } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/utils/functions";
import type { API } from "@strapi/client";
import { createFileRoute, notFound } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlogPost } from "@/types/strapi";

export const Route = createFileRoute("/_browse/_blog/blog/$postSlug")({
	loader: async ({ params }) => {
		const result = await strapiClient.collection("blog-posts").find({
			status: "published",
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
	console.log({ post });

	return (
		<div className={clsx("w-full max-w-6xl", "m-auto")}>
			<img
				src={import.meta.env.VITE_STRAPI_URL + post.coverImage.url}
				alt={post.coverImage.alternativeText}
				className={clsx(
					"rounded-lg border",
					"border-base-200",
					"w-full h-84",
					"object-cover object-center",
				)}
			/>
			<div className="flex items-center gap-4 mt-4">
				<h2
					className={clsx(
						"font-modern-header font-stretch-expanded font-black",
						"text-primary-500 text-4xl",
					)}
				>
					{post.title}
				</h2>
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
			</div>
			<div className={clsx("flex", "text-sm", "text-base-400", "gap-4")}>
				<div>{dayjs(post.createdAt).format("MMMM DD, YYYY @ h:mmA")}</div>
				{post.updatedAt && !dayjs(post.updatedAt).isSame(post.createdAt) && (
					<div>
						Last updated {dayjs(post.updatedAt).format("MMMM DD, YYYY @ h:mmA")}
					</div>
				)}
			</div>
			<div className={clsx("my-2")}>{post.summary}</div>
			<div id="post-content" className={clsx("my-12")}>
				<BlocksRenderer
					content={post.content}
					modifiers={{
						bold: ({ children }) => (
							<strong className="text-primary-600">{children}</strong>
						),
					}}
					blocks={{
						paragraph: ({ children }) => (
							<p className="mb-4 leading-8">{children}</p>
						),
						heading: ({ children, level }) => {
							const HeadingTag = `h${level}` as const;
							return (
								<HeadingTag
									className={clsx(
										"font-black font-modern-header font-stretch-expanded",
										level === 1 && "text-4xl text-primary-500 mb-4",
										level === 2 && "text-3xl text-primary-600 mb-4",
										level === 3 && "text-2xl text-primary-500 mb-3",
									)}
								>
									{children}
								</HeadingTag>
							);
						},
						image: ({ image }) => (
							<img
								src={image.url}
								alt={image.alternativeText ?? ""}
								className="max-w-lg"
							/>
						),
					}}
				/>
			</div>
		</div>
	);
}
