import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CATEGORIES } from "@/lib/providers";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo tone="ink" />
          <p className="mt-5 text-sm leading-relaxed text-ink-foreground/75">
            Helping pet owners discover veterinary clinics, hospitals, boarding, diagnostics, ambulances
            and welfare organisations — all in one place.
          </p>
          <p className="mt-4 text-xs text-ink-foreground/60">
            In an emergency, contact your nearest veterinary hospital directly.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground/60">Platform</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-warm">Home</Link></li>
            <li><Link to="/explore" className="hover:text-warm">Explore Services</Link></li>
            <li><Link to="/for-providers" className="hover:text-warm">For Providers</Link></li>
            <li><Link to="/about" className="hover:text-warm">About</Link></li>
            <li>
              <Link to="/submit-correction" className="font-semibold text-warm hover:underline">
                Submit a Correction
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground/60">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to="/explore" search={{ category: c.slug }} className="hover:text-warm">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground/60">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/80">
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0" aria-hidden /> hello@example.com (placeholder)</li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0" aria-hidden /> +91 00000 00000 (placeholder)</li>
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden /> Office address coming soon</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Practo for Animals. All provider listings shown are demonstration data.</p>
          <p>Information is provided for discovery only and is not veterinary advice.</p>
        </div>
      </div>
    </footer>
  );
}
