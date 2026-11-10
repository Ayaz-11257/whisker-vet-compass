import { Link } from "@tanstack/react-router";
import { Menu, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/explore", label: "Explore Services", exact: false },
  { to: "/for-providers", label: "For Providers", exact: false },
  { to: "/about", label: "About", exact: false },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur-xl">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary-deep"
              activeProps={{ className: "bg-primary-soft !text-primary-deep" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="warm" className="hidden sm:inline-flex">
            <Link to="/for-providers" hash="list-your-business">
              <Plus aria-hidden /> List Your Business
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-card">
              <SheetHeader className="items-start text-left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    activeProps={{ className: "bg-primary-soft text-primary-deep" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button asChild variant="warm" size="lg" className="mt-6 w-full">
                <Link to="/for-providers" hash="list-your-business" onClick={() => setOpen(false)}>
                  <Plus aria-hidden /> List Your Business
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
