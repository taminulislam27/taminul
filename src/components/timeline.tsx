import { cn } from "@/lib/utils";

type Item = { period: string; role: string; org: string; status: "Ongoing" | "Ended" };

export function Timeline({ items }: { items: readonly Item[] }) {
  return (
    <ol className="space-y-5 border-l border-border pl-5">
      {items.map((t) => (
        <li key={`${t.org}-${t.period}-${t.role}`} className="relative">
          <span
            className={cn(
              "absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background",
              t.status === "Ongoing" ? "bg-accent" : "bg-muted-foreground/50",
            )}
          />
          <p className="font-mono text-xs text-muted-foreground">{t.period}</p>
          <p className="font-medium">{t.role}</p>
          <p className="text-sm text-muted-foreground">{t.org}</p>
        </li>
      ))}
    </ol>
  );
}
