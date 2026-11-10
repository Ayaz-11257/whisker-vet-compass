import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartPulse, Info, PawPrint, ShieldAlert, Users } from "lucide-react";
import heroImg from "@/assets/hero-vet.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Practo for Animals" },
      {
        name: "description",
        content:
          "Practo for Animals is a discovery platform that helps pet owners find veterinary and animal-care services in one place.",
      },
      { property: "og:title", content: "About Practo for Animals" },
      {
        property: "og:description",
        content: "Why we're building one clear place to discover animal-care services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <p className="eyebrow">
              <span className="h-px w-6 bg-warm" aria-hidden /> About us
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-primary-deep sm:text-5xl">
              Finding the right care for an animal shouldn't be hard.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Information about vets, hospitals, boarding and rescue groups is scattered across the web. Practo
              for Animals brings it into one clear, searchable directory so owners can act with confidence.
            </p>
          </div>
          <img
            src={heroImg}
            alt="A veterinarian with a golden retriever"
            width={1280}
            height={1280}
            className="aspect-square w-full max-w-sm justify-self-center rounded-[2rem] object-cover shadow-lift lg:justify-self-end"
          />
        </div>
      </section>

      <section className="container-page py-20">
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, title: "Discovery first", text: "We help you find and compare providers. Booking and care happen directly with them." },
            { icon: HeartPulse, title: "Every kind of care", text: "From routine check-ups to ambulances and animal welfare organisations." },
            { icon: Users, title: "Community accuracy", text: "Owners and providers can flag outdated information so listings stay useful." },
          ].map((v) => (
            <li key={v.title} className="rounded-3xl border border-border/80 bg-card p-7 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <v.icon className="size-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-card">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary-deep">
              <Info className="size-6 text-primary" aria-hidden /> What we don't do
            </h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li>• We don't publish ratings, reviews or testimonials we can't verify.</li>
              <li>• We don't claim real-time availability for emergency services.</li>
              <li>• We don't provide veterinary advice or diagnoses.</li>
              <li>• The listings currently shown are demonstration data, not real businesses.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-emergency/30 bg-emergency-soft p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-emergency">
              <ShieldAlert className="size-6" aria-hidden /> In an emergency
            </h2>
            <p className="mt-4 text-foreground/80">
              If your animal is seriously ill or injured, contact your nearest veterinary hospital straight away.
              Use our emergency filter to find providers that list emergency services, and always call ahead to
              confirm they can help.
            </p>
            <Button asChild variant="emergency" className="mt-6">
              <Link to="/explore" search={{ emergency: true }}>Find emergency listings</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-ink-gradient p-10 text-center text-ink-foreground">
          <PawPrint className="size-8 text-warm" aria-hidden />
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to find care?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="onInk" size="lg"><Link to="/explore">Explore Services</Link></Button>
            <Button asChild variant="ghostInk" size="lg"><Link to="/for-providers">For Providers</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
