import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX, Siren, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SearchBar } from "@/components/site/SearchBar";
import { ProviderCard } from "@/components/site/ProviderCard";
import { DemoNotice } from "@/components/site/DemoNotice";
import {
  CATEGORIES,
  PROVIDERS,
  filterProviders,
  getCategory,
  isCategorySlug,
  type CategorySlug,
} from "@/lib/providers";
import { cn } from "@/lib/utils";

interface ExploreSearch {
  q?: string | undefined;
  location?: string | undefined;
  category?: CategorySlug | undefined;
  emergency?: boolean | undefined;
}

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): ExploreSearch => {
    const { q, location, category, emergency } = search;
    return {
      q: typeof q === "string" && q ? q : undefined,
      location: typeof location === "string" && location ? location : undefined,
      category: isCategorySlug(category) ? category : undefined,
      emergency: emergency === true || emergency === "true" ? true : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Explore Animal Care Services — Practo for Animals" },
      {
        name: "description",
        content:
          "Browse veterinary clinics, animal hospitals, boarding, diagnostics, ambulances and welfare NGOs by location and service.",
      },
      { property: "og:title", content: "Explore Animal Care Services — Practo for Animals" },
      {
        property: "og:description",
        content: "Filter animal-care providers by service type, location and emergency availability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = filterProviders(PROVIDERS, search);
  const activeCategory = search.category ? getCategory(search.category) : undefined;
  const hasFilters = Boolean(search.q || search.location || search.category || search.emergency);

  return (
    <>
      <section className="bg-hero pb-10 pt-10 md:pt-14">
        <div className="container-page">
          <p className="eyebrow">
            <span className="h-px w-6 bg-warm" aria-hidden /> Explore services
          </p>
          <h1 className="mt-3 text-4xl font-bold text-primary-deep sm:text-5xl">
            {activeCategory ? activeCategory.name : "Find animal care"}
            {search.location && <span className="text-primary"> in {search.location}</span>}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {activeCategory
              ? activeCategory.description
              : "Search by location and care type, or browse every category below."}
          </p>
          <SearchBar
            key={`${search.location ?? ""}-${search.category ?? ""}`}
            className="mt-8"
            compact
            defaultLocation={search.location}
            defaultCategory={search.category}
            keep={{ q: search.q, emergency: search.emergency }}
          />
        </div>
      </section>

      <section className="container-page py-10" aria-label="Results">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <CategoryChip active={!search.category} onClick={() => navigate({ search: (p) => ({ ...p, category: undefined }) })}>
              All
            </CategoryChip>
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c.slug}
                active={search.category === c.slug}
                onClick={() =>
                  navigate({
                    search: (p) => ({ ...p, category: p.category === c.slug ? undefined : c.slug }),
                  })
                }
              >
                <c.icon className="size-4" aria-hidden /> {c.short}
              </CategoryChip>
            ))}
          </div>

          <label className="flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-card">
            <Siren className="size-4 text-emergency" aria-hidden />
            <span className="text-sm font-medium">Lists emergency services</span>
            <Switch
              checked={Boolean(search.emergency)}
              onCheckedChange={(v) => navigate({ search: (p) => ({ ...p, emergency: v ? true : undefined }) })}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <strong className="text-foreground">{results.length}</strong> sample listing
            {results.length === 1 ? "" : "s"} found
          </p>
          {hasFilters && (
            <Button asChild variant="ghost" size="sm">
              <Link to="/explore">
                <X aria-hidden /> Clear all filters
              </Link>
            </Button>
          )}
        </div>

        {search.emergency && (
          <DemoNotice className="mt-4">
            Showing providers that list emergency services. Availability is not monitored in real time — please
            call ahead to confirm before travelling.
          </DemoNotice>
        )}

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <li key={p.id}>
                <ProviderCard provider={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <SearchX className="size-7" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-semibold">No listings match yet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Try a nearby city, a different service, or clear your filters. Sample listings currently cover
              Bengaluru, Delhi, Hyderabad, Kolkata, Mumbai and Pune.
            </p>
            <Button asChild variant="soft" className="mt-6">
              <Link to="/explore">Clear filters</Link>
            </Button>
          </div>
        )}

        <DemoNotice className="mt-10" />
      </section>
    </>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-glow"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent",
      )}
    >
      {children}
    </button>
  );
}
