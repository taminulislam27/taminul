import type { ComponentProps } from "react";
import Image from "next/image";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

type Components = NonNullable<MDXRemoteProps["components"]>;

// Styles for MDX content. Tailwind v4 has no built-in prose class, so they live here.
export const mdxComponents: Components = {
  h2: ({ className, ...props }: ComponentProps<"h2">) => (
    <h2 className={cn("mb-3 mt-12 scroll-mt-24 text-2xl font-bold tracking-tight", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3 className={cn("mb-2 mt-8 scroll-mt-24 text-lg font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p className={cn("my-4 leading-relaxed text-muted-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul className={cn("my-4 list-disc space-y-2 pl-6 text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol className={cn("my-4 list-decimal space-y-2 pl-6 text-muted-foreground", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentProps<"strong">) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  a: ({ className, href = "", ...props }: ComponentProps<"a">) => {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cn("text-accent underline-offset-4 hover:underline", className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      className={cn("rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre
      className={cn(
        "my-5 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote className={cn("my-5 border-l-2 border-accent pl-4 italic text-muted-foreground", className)} {...props} />
  ),
  table: ({ className, ...props }: ComponentProps<"table">) => (
    <div className="my-5 overflow-x-auto">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: ComponentProps<"th">) => (
    <th className={cn("border-b border-border px-3 py-2 font-semibold", className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentProps<"td">) => (
    <td className={cn("border-b border-border px-3 py-2 text-muted-foreground", className)} {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  // Markdown images: keep natural aspect ratio, stay inside the column.
  img: ({ src, alt = "" }: ComponentProps<"img">) =>
    typeof src === "string" ? (
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(min-width: 768px) 768px, 100vw"
        className="my-6 h-auto w-full rounded-lg border border-border"
      />
    ) : null,
};
