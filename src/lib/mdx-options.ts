import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

// Shared by blog posts and project case studies.
export const mdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      // Unknown languages (and plain "text" blocks) are left unhighlighted instead of throwing.
      [rehypeHighlight, { ignoreMissing: true, plainText: ["text", "txt"] }],
    ],
  },
};
