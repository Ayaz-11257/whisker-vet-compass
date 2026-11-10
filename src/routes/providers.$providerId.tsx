import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Info, MapPin, MessageSquareWarning, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/site/ContactDialog";
import { DemoBadge, DemoNotice } from "@/components/site/DemoNotice";
import { getCategory, getProvider } from "@/lib/providers";

export const Route = createFileRoute("/providers/$providerId")({
  loader: ({ params }) => {
    const provider = getProvider(params.providerId);
    if (!provider) throw notFound();
    return { provider };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.provider;
    const title = p ? `${p.name} (demo listing) — Practo for Animals` : "Listing unavailable — Practo for Animals";
    const description = p
      ? `Sample listing: ${p.services.slice(0, 3).join(", ")} in ${p.area}, ${p.city}.`
      : "This listing could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-bold text-primary-deep">Listing not found</h1>
      <p className="mt-2 text-muted-foreground">This provider may have been removed or the link is incorrect.</p>
      <Button asChild className="mt-6">
        <Link to="/explore">Back to Explore</Link>
      </Button>
    </div>
  ),
  component: ProviderPage,
});

function ProviderPage() {
  const { provider } = Route.useLoaderData();

  return (
    <>
      <section className="bg-hero pb-12 pt-8">
        <div className="container-page">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link to="/explore">
              <ArrowLeft aria-hidden /> Back to results
            </Link>
          </Button>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DemoBadge />
                {provider.categories.map((slug) => {
                  const c = getCategory(slug);
                  if (!c) return null;
                  return (
                    <Link
                      key={slug}
                      to="/explore"
                      search={{ category: slug }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary-deep shadow-card hover:bg-accent"
                    >
                      <c.icon className="size-3.5" aria-hidden /> {c.name}
                    </Link>
                  );
                })}
              </div>
              <h1 className="mt-4 text-4xl font-bold text-primary-deep sm:text-5xl">{provider.name}</h1>
              <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 text-primary" aria-hidden /> {provider.address}
              </p>
            </div>
            <ContactDialog provider={provider} variant="hero" size="lg" label="Contact provider" />
          </div>
        </div>
      </section>

      <section className="container-page grid gap-6 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <DemoNotice />
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-semibold">About this listing</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{provider.about}</p>
            <h3 className="mt-8 text-lg font-semibold">Services listed</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {provider.services.map((s) => (
                <li key={s} className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-medium">
                  <span className="size-1.5 rounded-full bg-warm" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="size-5 text-primary" aria-hidden /> Opening hours
            </h2>
            <dl className="mt-4 divide-y divide-border">
              {provider.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{h.days}</dt>
                  <dd className="text-right font-medium">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex gap-2 text-xs text-muted-foreground">
              <Info className="size-3.5 shrink-0" aria-hidden /> Hours may change. Confirm with the provider.
            </p>
          </div>

          {provider.emergency && (
            <div className="rounded-3xl border border-emergency/30 bg-emergency-soft p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-emergency">
                <Siren className="size-5" aria-hidden /> Lists emergency services
              </h2>
              <p className="mt-2 text-sm text-foreground/80">
                This provider states that it offers emergency care. Real-time availability is not guaranteed —
                call before you travel.
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <MessageSquareWarning className="size-5 text-warm" aria-hidden /> Something wrong?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Help keep information accurate by reporting outdated details.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link to="/submit-correction" search={{ listing: provider.name }}>
                Submit a correction
              </Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
