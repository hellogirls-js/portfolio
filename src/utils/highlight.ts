import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import css from "shiki/langs/css.mjs";
import tsx from "shiki/langs/tsx.mjs";
import { syntaxHighlighting } from "@/utils/constants";

const highlighter = createHighlighterCoreSync({
  themes: [syntaxHighlighting],
  langs: [tsx, css],
  engine: createJavaScriptRegexEngine(),
});

export function highlightCode(code: string, language = "typescript") {
  return highlighter.codeToHast(code, {
    lang: language === "css" ? "css" : "tsx",
    theme: syntaxHighlighting.name ?? "",
  });
}

export function highlightCodeBlocks(content: BlocksContent) {
  return content.map((block) => {
    if (block.type !== "code") return block;

    const { language } = block as typeof block & { language?: string };
    const code = block.children
      .map((child) => (child.type === "text" ? child.text : ""))
      .join("")
      .trimEnd();

    return { ...block, hast: highlightCode(code, language) };
  });
}
