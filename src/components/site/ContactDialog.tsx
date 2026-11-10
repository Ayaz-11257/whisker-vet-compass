import { Phone } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Provider } from "@/lib/providers";
import { DemoNotice } from "./DemoNotice";

export function ContactDialog({
  provider,
  variant = "default",
  size,
  className,
  label = "Contact",
}: {
  provider: Provider;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Phone aria-hidden /> {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Contact {provider.name}</DialogTitle>
          <DialogDescription>{provider.address}</DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl bg-muted p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</p>
          <p className="mt-1 font-display text-2xl font-semibold text-primary-deep">{provider.phone}</p>
          <p className="mt-2 text-sm text-muted-foreground">{provider.hoursSummary}</p>
        </div>
        <DemoNotice>
          This is a demonstration listing. The number above is a placeholder and will not connect to a real
          business. Always confirm opening hours and availability directly with a provider.
        </DemoNotice>
      </DialogContent>
    </Dialog>
  );
}
