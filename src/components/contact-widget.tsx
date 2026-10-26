"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, MessageSquare, X } from "lucide-react";
import { site } from "@/lib/site";

const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi Taminul, I found your website and wanted to say hello.",
)}`;

/**
 * Floating "Let's connect!" button, bottom-right on every page.
 * Opens a small menu with WhatsApp and NGL. Closes with the X, the Escape key or a click outside.
 */
export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 print:hidden sm:bottom-6 sm:right-6">
      {open && (
        <div
          id="connect-panel"
          role="dialog"
          aria-label="Let's connect"
          className="w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-black/30"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-accent">
              <MessageCircle size={22} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold leading-tight">Let&apos;s connect!</p>
              <p className="mt-1 text-sm text-muted-foreground">Have a question or want to connect?</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Close widget"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-muted/50">
            <li>
              <a
                ref={firstLinkRef}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-muted"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <MessageCircle size={20} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Chat on WhatsApp</span>
                  <span className="block text-sm text-muted-foreground">Projects, opportunities &amp; quick chats</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={site.ngl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-muted"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-300">
                  <MessageSquare size={20} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Ask me anonymously</span>
                  <span className="block text-sm text-muted-foreground">Send me a question through NGL</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-violet-600 dark:text-violet-300" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>

          <p className="mt-4 text-center text-xs text-muted-foreground">Usually around? Feel free to say hello!</p>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="connect-panel"
        aria-label={open ? "Close widget" : "Let's connect"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-black/30 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {open ? <X size={24} aria-hidden /> : <MessageCircle size={24} aria-hidden />}
      </button>
    </div>
  );
}
