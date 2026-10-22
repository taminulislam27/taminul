import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Wrong answer on this test case.</h1>
      <p className="mt-3 text-muted-foreground">That page doesn&apos;t exist (yet). Let&apos;s get you back on track.</p>
      <Link href="/" className="mt-6 inline-block text-accent underline-offset-4 hover:underline">
        Back to home
      </Link>
    </div>
  );
}
