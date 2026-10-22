export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function ComingSoon({ week, children }: { week: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <div className="rounded-xl border border-dashed border-border bg-card p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">Planned for {week}</p>
        <div className="mt-2 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
