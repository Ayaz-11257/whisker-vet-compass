import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-warm/40 bg-warm-soft px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider whitespace-nowrap text-warm-foreground",
        className,
      )}
    >
      <FlaskConical className="size-3" aria-hidden /> Demo data
    </span>
  );
}

export function DemoNotice({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-warm/30 bg-warm-soft px-4 py-3 text-sm text-warm-foreground",
        className,
      )}
    >
      <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>
        {children ??
          "These are sample listings for demonstration only. They are fictional businesses — names, addresses and phone numbers are placeholders."}
      </p>
    </div>
  );
}
