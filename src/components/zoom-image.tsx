"use client";

import Image from "next/image";
import { useRef } from "react";
import { X } from "lucide-react";
import type { Photo } from "@/lib/gallery";
import { cn } from "@/lib/utils";

/**
 * A photo with an optional caption. Clicking it opens a larger view in a native <dialog>
 * (Escape closes it, the backdrop closes it, focus is handled by the browser).
 *
 * ratio: a Tailwind aspect class such as "aspect-[4/3]" crops the thumbnail to that shape.
 * The enlarged view always shows the whole picture.
 */
export function ZoomImage({
  photo,
  ratio,
  sizes = "(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw",
  priority = false,
  position = "object-center",
  showCaption = true,
  bare = false,
  className,
}: {
  photo: Photo;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  showCaption?: boolean;
  /** No frame or background: for cut-out (transparent) photos that should sit on the page colour. */
  bare?: boolean;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className={cn("m-0", className)}>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Enlarge photo: ${photo.alt}`}
        className={cn("group block w-full cursor-zoom-in text-left", !bare && "overflow-hidden rounded-xl border border-border bg-card")}
      >
        {ratio ? (
          <span className={cn("relative block w-full", ratio)}>
            <Image
              src={photo.src}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              className={cn("object-cover transition-transform duration-300 group-hover:scale-[1.02]", position)}
            />
          </span>
        ) : (
          <Image
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </button>

      {showCaption && photo.caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>
      )}

      <dialog
        ref={dialogRef}
        aria-label={photo.alt}
        onClick={(e) => {
          // A click on the dark backdrop targets the dialog element itself.
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto max-h-[94vh] h-fit w-fit max-w-[94vw] overflow-hidden rounded-xl border-0 bg-transparent p-0 backdrop:bg-black/80"
      >
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X size={18} aria-hidden />
        </button>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="94vw"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          className="block h-auto max-h-[90vh] w-auto max-w-[94vw]"
        />
      </dialog>
    </figure>
  );
}
