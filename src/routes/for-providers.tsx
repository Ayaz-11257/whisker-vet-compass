import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Eye, Send, Siren, Store, UserRoundCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import clinicImg from "@/assets/provider-clinic.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, fieldClass } from "@/components/site/FormField";
import { DemoNotice } from "@/components/site/DemoNotice";
import { CATEGORIES } from "@/lib/providers";

export const Route = createFileRoute("/for-providers")({
  head: () => ({
    meta: [
      { title: "List Your Animal Care Business — Practo for Animals" },
      {
        name: "description",
        content:
          "Veterinary clinics, animal hospitals, boarding, diagnostics, ambulances and NGOs: create a free listing so pet owners can find you.",
      },
      { property: "og:title", content: "List Your Animal Care Business — Practo for Animals" },
      {
        property: "og:description",
        content: "Create a free listing and help pet owners in your area discover your services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForProvidersPage,
});

function ForProvidersPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">
              <span className="h-px w-6 bg-warm" aria-hidden /> For providers
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-primary-deep sm:text-5xl">
              Help more pet owners find your care.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Whether you run a neighbourhood clinic, a 24-hour hospital, a boarding facility or a rescue
              organisation, a listing puts your services in front of people actively looking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="warm" size="lg">
                <a href="#list-your-business">List Your Business</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">How it works</a>
              </Button>
            </div>
          </div>
          <img
            src={clinicImg}
            alt="A veterinary clinic owner at a modern reception desk"
            width={1280}
            height={960}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
          />
        </div>
      </section>

      <section id="how-it-works" className="container-page scroll-mt-24 py-20">
        <h2 className="text-3xl font-bold text-primary-deep sm:text-4xl">What you get</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Store, title: "A clear profile", text: "Services, opening hours, address and contact in one place." },
            { icon: Eye, title: "Category visibility", text: "Show up when owners browse your type of care." },
            { icon: Siren, title: "Emergency flag", text: "Let owners know if you offer emergency services." },
            { icon: UserRoundCheck, title: "You stay in control", text: "Request updates to your listing at any time." },
          ].map((f) => (
            <li key={f.title} className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <f.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </li>
          ))}
        </ul>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { title: "Tell us about your business", text: "Fill in the short form below." },
            { title: "We review your details", text: "Our team checks the information before anything goes live." },
            { title: "Your listing goes live", text: "Pet owners can find and contact you directly." },
          ].map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-warm font-display font-bold text-warm-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="list-your-business" className="scroll-mt-20 bg-mint py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
              <ClipboardList className="size-6" aria-hidden />
            </span>
            <h2 className="mt-5 text-3xl font-bold text-primary-deep sm:text-4xl">List Your Business</h2>
            <p className="mt-3 text-muted-foreground">
              Share a few details and we'll get in touch about setting up your listing. Listing is free.
            </p>
            <DemoNotice className="mt-6">
              This is a preview of the sign-up form. Submissions aren't stored or sent anywhere yet.
            </DemoNotice>
          </div>
          <ListingForm />
        </div>
      </section>
    </>
  );
}

function ListingForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) {
      setCategoryError(true);
      return;
    }
    const data = new FormData(e.currentTarget);
    setSubmitted(String(data.get("business") ?? ""));
  }

  if (submitted !== null) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-lift" role="status">
        <span className="grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-primary-deep">Thanks{submitted ? `, ${submitted}` : ""}!</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Your details look good. Because this is a preview, nothing has been sent yet — once sign-ups are
          switched on, our team will follow up from here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => { setSubmitted(null); setCategory(""); }}>
            Submit another
          </Button>
          <Button asChild>
            <Link to="/explore">See example listings</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-lift sm:grid-cols-2 sm:p-8" noValidate={false}>
      <div className="sm:col-span-2">
        <FormField id="business" label="Business name" required>
          <Input id="business" name="business" required maxLength={120} className={fieldClass} placeholder="e.g. Sunrise Vet Clinic" />
        </FormField>
      </div>
      <FormField id="category" label="Type of service" required>
        <Select value={category} onValueChange={(v) => { setCategory(v); setCategoryError(false); }}>
          <SelectTrigger id="category" aria-invalid={categoryError} className={`${fieldClass} ${categoryError ? "border-emergency" : ""}`}>
            <SelectValue placeholder="Choose one" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {CATEGORIES.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {categoryError && <p className="text-xs font-medium text-emergency">Please choose a service type.</p>}
      </FormField>
      <FormField id="city" label="City" required>
        <Input id="city" name="city" required maxLength={80} className={fieldClass} placeholder="e.g. Kolkata" />
      </FormField>
      <FormField id="contact" label="Your name" required>
        <Input id="contact" name="contact" required maxLength={100} autoComplete="name" className={fieldClass} />
      </FormField>
      <FormField id="phone" label="Phone">
        <Input id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" className={fieldClass} />
      </FormField>
      <div className="sm:col-span-2">
        <FormField id="email" label="Email" required>
          <Input id="email" name="email" type="email" required maxLength={160} autoComplete="email" className={fieldClass} placeholder="you@clinic.com" />
        </FormField>
      </div>
      <div className="sm:col-span-2">
        <FormField id="notes" label="Services you offer" hint="Optional — e.g. vaccinations, surgery, grooming, 24-hour care.">
          <Textarea id="notes" name="notes" maxLength={1000} rows={4} className="rounded-xl bg-card text-base" />
        </FormField>
      </div>
      <Button type="submit" variant="warm" size="lg" className="sm:col-span-2">
        <Send aria-hidden /> Submit listing request
      </Button>
    </form>
  );
}
