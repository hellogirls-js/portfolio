import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface ChatboxMessage {
	id: string;
	nickname: string;
	message: string;
	createdAt: Date;
}

type ChatboxMessageInput = Pick<ChatboxMessage, "nickname" | "message">;

interface StrapiImageFormat {
	url: string;
	width: number;
	height: number;
}

interface StrapiImageMedia extends StrapiImageFormat {
	alternativeText?: string;
	formats: Partial<
		Record<"thumbnail" | "small" | "medium" | "large", StrapiImageFormat>
	>;
}

type BlogPostTag = "coding" | "cosplay" | "review" | "life";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	summary: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	coverImage: API;
	tag: BlogPostTag | null;
	content: BlocksContent;
}
