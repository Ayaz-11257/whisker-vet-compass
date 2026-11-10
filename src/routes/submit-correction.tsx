import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageSquareWarning, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, fieldClass } from "@/components/site/FormField";
import { DemoNotice } from "@/components/site/DemoNotice";

interface CorrectionSearch {
  listing?: string | undefined;
}

const ISSUES = [
  "Opening hours are wrong",
  "Phone or contact details are wrong",
  "Address or location is wrong",
  "Services listed are wrong",
  "Emergency status is wrong",
  "Business has closed",
  "Something else",
];

export const Route = createFileRoute("/submit-correction")({
  validateSearch: (s: Record<string, unknown>): CorrectionSearch => {
    const { listing } = s;
    return { listing: typeof listing === "string" && listing ? listing.slice(0, 120) : undefined };
  },
  head: () => ({
    meta: [
      { title: "Submit a Correction — Practo for Animals" },
      { name: "description", content: "Report outdated or incorrect information on a Practo for Animals listing." },
      { property: "og:title", content: "Submit a Correction — Practo for Animals" },
      { property: "og:description", content: "Help keep animal-care listings accurate for every pet owner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CorrectionPage,
});

function CorrectionPage() {
  const { listing } = Route.useSearch();
  const [done, setDone] = useState(false);
  const [issue, setIssue] = useState("");
  const [issueError, setIssueError] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!issue) {
      setIssueError(true);
      return;
    }
    setDone(true);
  }

  return (
    <section className="bg-hero py-14 lg:py-20">
      <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-warm text-warm-foreground shadow-warm">
            <MessageSquareWarning className="size-6" aria-hidden />
          </span>
          <h1 className="mt-5 text-4xl font-bold text-primary-deep">Submit a Correction</h1>
          <p className="mt-3 text-muted-foreground">
            Spotted wrong hours, an old phone number or a closed business? Let us know and we'll review it.
          </p>
          <DemoNotice className="mt-6">
            This is a preview form. Corrections aren't stored or sent anywhere yet.
          </DemoNotice>
        </div>

        {done ? (
          <div role="status" className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-lift">
            <span className="grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
              <CheckCircle2 className="size-8" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-primary-deep">Thanks for helping!</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Your correction is ready. Because this is a preview, nothing has been sent yet.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={() => { setDone(false); setIssue(""); }}>Report another</Button>
              <Button asChild><Link to="/explore">Back to Explore</Link></Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <FormField id="listing" label="Listing name" required>
              <Input id="listing" name="listing" required maxLength={120} defaultValue={listing} className={fieldClass} placeholder="Which provider is this about?" />
            </FormField>
            <FormField id="issue" label="What needs correcting?" required>
              <Select value={issue} onValueChange={(v) => { setIssue(v); setIssueError(false); }}>
                <SelectTrigger id="issue" aria-invalid={issueError} className={`${fieldClass} ${issueError ? "border-emergency" : ""}`}>
                  <SelectValue placeholder="Choose an issue" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {ISSUES.map((i) => (<SelectItem key={i} value={i}>{i}</SelectItem>))}
                </SelectContent>
              </Select>
              {issueError && <p className="text-xs font-medium text-emergency">Please choose an issue.</p>}
            </FormField>
            <FormField id="details" label="Correct information" required>
              <Textarea id="details" name="details" required maxLength={1000} rows={5} className="rounded-xl bg-card text-base" placeholder="Tell us what the correct details are." />
            </FormField>
            <FormField id="email" label="Your email" hint="Optional — only if you'd like us to follow up.">
              <Input id="email" name="email" type="email" maxLength={160} autoComplete="email" className={fieldClass} />
            </FormField>
            <Button type="submit" variant="hero" size="lg">
              <Send aria-hidden /> Send correction
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
