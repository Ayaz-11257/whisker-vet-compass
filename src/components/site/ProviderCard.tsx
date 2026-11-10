import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategory, type Provider } from "@/lib/providers";
import { ContactDialog } from "./ContactDialog";
import { DemoBadge } from "./DemoNotice";

export function ProviderCard({ provider }: { provider: Provider }) {
  const primary = getCategory(provider.categories[0] ?? "");
  const Icon = primary?.icon;
  const initials = provider.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <div className="relative flex items-start justify-between gap-3 bg-mint px-5 pb-5 pt-5">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-card font-display text-lg font-bold text-primary shadow-card">
            {initials}
          </span>
          {primary && Icon && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-primary-deep">
              <Icon className="size-3.5" aria-hidden /> {primary.short}
            </span>
          )}
        </div>
        <DemoBadge className="relative" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
            <Link
              to="/providers/$providerId"
              params={{ providerId: provider.id }}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {provider.name}
            </Link>
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
            {provider.area}, {provider.city}
          </p>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label="Services">
          {provider.services.slice(0, 3).map((s) => (
            <li key={s} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              {s}
            </li>
          ))}
          {provider.services.length > 3 && (
            <li className="rounded-lg px-1.5 py-1 text-xs font-medium text-muted-foreground">
              +{provider.services.length - 3} more
            </li>
          )}
        </ul>

        <div className="mt-auto space-y-2 border-t border-border/70 pt-4 text-sm">
          <p className="flex items-center gap-2 text-foreground">
            <Clock className="size-4 shrink-0 text-primary" aria-hidden /> {provider.hoursSummary}
          </p>
          {provider.emergency && (
            <p className="flex items-center gap-2 font-medium text-emergency">
              <Siren className="size-4 shrink-0" aria-hidden /> Lists emergency services
            </p>
          )}
        </div>

        <div className="relative z-10 flex gap-2">
          <ContactDialog provider={provider} className="flex-1" />
          <Button asChild variant="outline" className="flex-1">
            <Link to="/providers/$providerId" params={{ providerId: provider.id }}>
              Details <ArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
