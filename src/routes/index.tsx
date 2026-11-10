import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Ambulance,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Compass,
  Info,
  LayoutGrid,
  MessageSquareWarning,
  PawPrint,
  Search,
  Siren,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-vet.jpg";
import ambulanceImg from "@/assets/emergency-ambulance.jpg";
import clinicImg from "@/assets/provider-clinic.jpg";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/site/SearchBar";
import { ProviderCard } from "@/components/site/ProviderCard";
import { DemoNotice } from "@/components/site/DemoNotice";
import { CATEGORIES, PROVIDERS } from "@/lib/providers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Practo for Animals — Better Care for Every Paw" },
      {
        name: "description",
        content:
          "Find veterinary clinics, animal hospitals, pet boarding, diagnostics, animal ambulances and welfare NGOs near you.",
      },
      { property: "og:title", content: "Practo for Animals — Better Care for Every Paw" },
      {
        property: "og:description",
        content: "One place to discover vets, animal hospitals, boarding, diagnostics, ambulances and NGOs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <Emergency />
      <ProviderCta />
      <Trust />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-page grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-primary-deep shadow-card">
            <PawPrint className="size-3.5 text-warm" aria-hidden /> Animal-care discovery, made simple
          </span>
          <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] text-primary-deep sm:text-6xl lg:text-7xl">
            Better Care for{" "}
            <span className="relative whitespace-nowrap text-primary">
              Every Paw.
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-3 w-full text-warm"
                preserveAspectRatio="none"
              >
                <path d="M2 14 C 80 2, 200 2, 298 12" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Search one place for veterinary clinics, animal hospitals, boarding, diagnostic centres, animal
            ambulances and welfare NGOs — and compare services, hours and locations before you call.
          </p>

          <SearchBar className="mt-8" />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="lg">
              <Link to="/explore">
                <Compass aria-hidden /> Explore Services
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              Popular:{" "}
              {(["vet-clinics", "boarding", "diagnostics"] as const).map((slug, i) => (
                <span key={slug}>
                  {i > 0 && " · "}
                  <Link to="/explore" search={{ category: slug }} className="font-medium text-primary hover:underline">
                    {CATEGORIES.find((c) => c.slug === slug)?.short}
                  </Link>
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-4 -z-0 rotate-3 rounded-[2.5rem] bg-primary/10" aria-hidden />
          <img
            src={heroImg}
            alt="A veterinarian gently examining a happy golden retriever in a bright clinic"
            width={1280}
            height={1280}
            className="relative aspect-square w-full rounded-[2rem] object-cover shadow-lift"
          />
          <div className="animate-float-soft absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <LayoutGrid className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-foreground">6 care categories</p>
              <p className="text-xs text-muted-foreground">From check-ups to rescue</p>
            </div>
          </div>
          <div
            className="animate-float-soft absolute -right-3 top-8 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:-right-6"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-emergency-soft text-emergency">
              <Siren className="size-4" aria-hidden />
            </span>
            <p className="text-xs font-semibold text-foreground">
              Emergency listings
              <br />
              <span className="font-normal text-muted-foreground">clearly flagged</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  id,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">
        <span className="h-px w-6 bg-warm" aria-hidden /> {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-3xl font-bold text-primary-deep sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

function Categories() {
  return (
    <section className="container-page py-20" aria-labelledby="categories-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="categories-heading"
          eyebrow="Browse by care type"
          title="What does your pet need today?"
          text="Pick a category to see matching providers, then narrow down by location."
        />
        <Button asChild variant="link" className="self-start px-0 md:self-auto">
          <Link to="/explore">
            View all services <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const count = PROVIDERS.filter((p) => p.categories.includes(c.slug)).length;
          return (
            <li key={c.slug}>
              <Link
                to="/explore"
                search={{ category: c.slug }}
                className="group flex h-full items-start gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
              >
                <span
                  className={
                    i === 4
                      ? "grid size-14 shrink-0 place-items-center rounded-2xl bg-emergency-soft text-emergency transition-transform group-hover:scale-105"
                      : "grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform group-hover:scale-105"
                  }
                >
                  <c.icon className="size-7" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-semibold text-foreground">{c.name}</span>
                    <ArrowRight
                      className="size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.description}</span>
                  <span className="mt-3 inline-block text-xs font-semibold text-primary">
                    {count} sample listing{count === 1 ? "" : "s"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Featured() {
  const featured = PROVIDERS.filter((p) => p.featured);
  return (
    <section className="bg-card py-20" aria-labelledby="featured-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-6 bg-warm" aria-hidden /> Featured providers
            </p>
            <h2 id="featured-heading" className="mt-3 text-3xl font-bold text-primary-deep sm:text-4xl">
              A preview of what listings look like
            </h2>
          </div>
          <Button asChild variant="soft" size="lg">
            <Link to="/explore">
              Browse all listings <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <DemoNotice className="mt-8" />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.id}>
              <ProviderCard provider={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Emergency() {
  return (
    <section className="container-page py-20" aria-labelledby="emergency-heading">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-gradient text-ink-foreground shadow-lift">
        <div className="grid lg:grid-cols-2">
          <div className="relative z-10 p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-emergency px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
              <Siren className="size-3.5" aria-hidden /> Emergency care
            </span>
            <h2 id="emergency-heading" className="mt-5 text-3xl font-bold sm:text-4xl">
              Need help fast? Find emergency vets and animal ambulances.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink-foreground/80">
              Quickly filter to hospitals and clinics that list emergency services, and to ambulance operators
              that cover your area.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="onInk" size="lg">
                <Link to="/explore" search={{ emergency: true }}>
                  <Siren aria-hidden /> Find emergency vets
                </Link>
              </Button>
              <Button asChild variant="ghostInk" size="lg">
                <Link to="/explore" search={{ category: "ambulance" }}>
                  <Ambulance aria-hidden /> Ambulance services
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex gap-3 rounded-2xl bg-ink-foreground/10 p-4 text-sm text-ink-foreground/85">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              <p>
                Listings show providers that <strong>say</strong> they offer emergency care. We don't track live
                availability — always call ahead to confirm before travelling.
              </p>
            </div>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <img
              src={ambulanceImg}
              alt="An animal ambulance van parked outside a veterinary hospital at dusk"
              width={1280}
              height={960}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/30 to-transparent lg:via-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProviderCta() {
  return (
    <section className="bg-mint py-20" aria-labelledby="provider-cta-heading">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <img
            src={clinicImg}
            alt="A smiling clinic owner holding a tablet at a bright reception desk with a cat resting nearby"
            width={1280}
            height={960}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
          />
          <div className="absolute -bottom-6 right-6 hidden rounded-2xl border border-border bg-card p-4 shadow-lift sm:block">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="size-4 text-primary" aria-hidden /> Free to list
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Set up your profile in minutes</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            id="provider-cta-heading"
            eyebrow="For providers"
            title="Run a clinic, hospital or rescue? Get discovered."
            text="Create a listing so pet owners in your area can find your services, opening hours and contact details."
          />
          <ul className="mt-8 space-y-4">
            {[
              { icon: Building2, text: "One profile for your services, hours and location" },
              { icon: Clock, text: "Keep opening hours and emergency status up to date" },
              { icon: Sparkles, text: "Appear when owners browse your care category" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-card">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-medium text-foreground">{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="warm" size="lg">
              <Link to="/for-providers" hash="list-your-business">
                List Your Business <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/for-providers">How listing works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const steps = [
    { icon: Search, title: "Search by need and place", text: "Choose a care type and enter your city or neighbourhood." },
    { icon: ClipboardCheck, title: "Compare the essentials", text: "See services, opening hours and location side by side." },
    { icon: PawPrint, title: "Contact the provider", text: "Reach out directly to confirm details and book a visit." },
  ];
  return (
    <section className="container-page py-20" aria-labelledby="trust-heading">
      <SectionHeading
        id="trust-heading"
        align="center"
        eyebrow="How it works"
        title="Built to make finding care less stressful"
        text="Practo for Animals is a discovery directory. We help you find and compare animal-care providers — the care itself is always between you and the provider."
      />
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-3xl border border-border/80 bg-card p-7 shadow-card">
            <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-primary/10" aria-hidden>
              0{i + 1}
            </span>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
              <s.icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-card md:grid-cols-3 md:p-8">
        {[
          { title: "No made-up reviews", text: "We don't show ratings or testimonials we can't stand behind." },
          { title: "Clear labelling", text: "Sample and unconfirmed information is always marked as such." },
          { title: "Community corrections", text: "Spotted something out of date? Tell us and we'll review it." },
        ].map((t) => (
          <div key={t.title} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-semibold text-foreground">{t.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <MessageSquareWarning className="size-4 text-warm" aria-hidden />
        See an error in a listing?{" "}
        <Link to="/submit-correction" className="font-semibold text-primary hover:underline">
          Submit a correction
        </Link>
      </p>
    </section>
  );
}
