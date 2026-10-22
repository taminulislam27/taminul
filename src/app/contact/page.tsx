import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { contactCards, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to internships, mentoring and collaboration.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Let's talk."
        subtitle="I'm open to internships, mentoring students, and collaborating on projects. If you have an opportunity or an idea, send me a message and I'll reply as soon as I can."
      />
      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {contactCards.map((c) => (
            <li key={c.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm formId={process.env.NEXT_PUBLIC_FORMSPREE_ID} />
          <aside aria-label="Other ways to reach me" className="text-sm text-muted-foreground">
            <h2 className="font-mono text-xs uppercase tracking-wider text-accent">Prefer email?</h2>
            <p className="mt-3">
              Write to{" "}
              <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              . You can also find me on LinkedIn and GitHub using the links in the footer.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
