import { Link } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "ink" }) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Practo for Animals — home"
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-12",
          tone === "ink" ? "bg-ink-foreground text-primary-deep" : "bg-primary text-primary-foreground shadow-glow",
        )}
      >
        <PawPrint className="size-5" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            tone === "ink" ? "text-ink-foreground" : "text-primary-deep",
          )}
        >
          Practo
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
            tone === "ink" ? "text-ink-foreground/70" : "text-warm",
          )}
        >
          for Animals
        </span>
      </span>
    </Link>
  );
}
