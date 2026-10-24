"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-accent">Error</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Runtime error. Let&apos;s retry.</h1>
      <p className="mt-3 text-muted-foreground">Something went wrong while loading this page.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
