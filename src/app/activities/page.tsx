import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { ZoomImage } from "@/components/zoom-image";
import { activities, photos, type Photo } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Activities & Awards",
  description:
    "Organizing the Hult Prize, representing the University of Barishal as a Campus Ambassador, leading at BUITS, and the certificates and awards along the way.",
};

// Which photos go with which activity (ids match src/lib/gallery.ts).
const media: Record<string, Photo[]> = {
  "hult-prize": [photos.hultCertificate, photos.hultBadge],
  aibc: [photos.aibc],
  buits: [photos.buits],
  run: [photos.runTeam, photos.runSolo],
};


export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Activities & awards"
        subtitle="Beyond code and contests: organizing, representing my university and working with a team. Click any photo to enlarge it."
      />

      <div className="mx-auto max-w-5xl divide-y divide-border px-4 pb-6 sm:px-6">
        {activities.map((a) => {
          const images = media[a.id] ?? [];
          return (
            <article key={a.id} className="grid gap-8 py-12 md:grid-cols-2 md:items-start">
              <div>
                {a.period && <p className="font-mono text-xs uppercase tracking-wider text-accent">{a.period}</p>}
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{a.title}</h2>
                <div className="mt-4 space-y-3 text-muted-foreground">
                  {a.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {"link" in a && a.link && (
                  <a
                    href={a.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
                  >
                    {a.link.label} <ExternalLink size={13} aria-hidden />
                  </a>
                )}
              </div>

              <div className={images.length > 1 ? "grid grid-cols-[3fr_2fr] items-start gap-4" : "mx-auto w-full max-w-sm md:max-w-none"}>
                {images.map((img) => (
                  <ZoomImage
                    key={img.src}
                    photo={img}
                    // Photos in a pair share one height so the pair lines up.
                    ratio={images.length > 1 ? "h-64 sm:h-72" : undefined}
                    position="object-top"
                    sizes="(min-width: 768px) 480px, 100vw"
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <Section
        title="Certificates & awards"
        subtitle="Recognition from programs I took part in."
        className="border-t border-border"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <ZoomImage photo={photos.phitronAmbassador} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          <ZoomImage photo={photos.phitronDsa} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          <ZoomImage photo={photos.onebyzero} ratio="aspect-[4/3]" position="object-[50%_45%]" sizes="(min-width: 640px) 33vw, 100vw" />
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          More on contests and practice on the{" "}
          <Link href="/competitive-programming" className="text-accent underline-offset-4 hover:underline">
            competitive programming page
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
