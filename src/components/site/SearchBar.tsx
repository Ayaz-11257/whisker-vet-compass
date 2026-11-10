import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search, Stethoscope } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CITIES, isCategorySlug, type CategorySlug } from "@/lib/providers";
import { cn } from "@/lib/utils";

export function SearchBar({
  defaultLocation = "",
  defaultCategory,
  keep,
  className,
  compact = false,
}: {
  defaultLocation?: string | undefined;
  defaultCategory?: CategorySlug | undefined;
  keep?: { q?: string | undefined; emergency?: boolean | undefined };
  className?: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(defaultLocation);
  const [category, setCategory] = useState<string>(defaultCategory ?? "all");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({
      to: "/explore",
      search: {
        ...keep,
        location: location.trim() || undefined,
        category: isCategorySlug(category) ? category : undefined,
      },
    });
  }

  return (
    <form
      role="search"
      aria-label="Find animal care"
      onSubmit={onSubmit}
      className={cn(
        "grid gap-2 rounded-3xl border border-border bg-card p-2 shadow-lift md:grid-cols-[1fr_1fr_auto] md:items-center",
        className,
      )}
    >
      <label className="flex items-center gap-3 rounded-2xl px-4 py-2 transition-colors focus-within:bg-muted hover:bg-muted/60">
        <MapPin className="size-5 shrink-0 text-primary" aria-hidden />
        <span className="flex w-full flex-col">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">Location</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="city-suggestions"
            placeholder="City or area"
            className={cn(
              "w-full bg-transparent font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/80",
              compact ? "text-sm" : "text-base",
            )}
          />
          <datalist id="city-suggestions">
            {CITIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </span>
      </label>

      <div className="flex items-center gap-3 rounded-2xl px-4 py-2 transition-colors hover:bg-muted/60 md:border-l md:border-border md:rounded-l-none">
        <Stethoscope className="size-5 shrink-0 text-primary" aria-hidden />
        <div className="flex w-full flex-col">
          <span id="service-label" className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
            Service
          </span>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              aria-labelledby="service-label"
              className={cn(
                "h-auto border-0 bg-transparent p-0 font-medium shadow-none focus:ring-0 focus-visible:ring-0",
                compact ? "text-sm" : "text-base",
              )}
            >
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="all">All services</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" variant="hero" size={compact ? "lg" : "xl"} className="rounded-2xl">
        <Search aria-hidden /> Find Animal Care
      </Button>
    </form>
  );
}
