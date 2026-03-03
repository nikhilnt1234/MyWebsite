import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContactField } from "@/lib/data";

type ContactCardProps = {
  headline: string;
  copy: string;
  fields: ContactField[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  quickLinksLabel: string;
  quickLinks: { label: string; value: string }[];
};

export function ContactCard({
  headline,
  copy,
  fields,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  quickLinksLabel,
  quickLinks
}: ContactCardProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-border/70 bg-background/70">
        <CardHeader>
          <CardTitle>{headline}</CardTitle>
          <p className="text-sm text-muted-foreground">{copy}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <div key={field.label} className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{field.label}</label>
              <Input type={field.type} placeholder={field.placeholder} aria-label={field.label} />
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{messageLabel}</label>
            <Textarea placeholder={messagePlaceholder} aria-label={messagePlaceholder} />
          </div>
          <Button>{submitLabel}</Button>
        </CardContent>
      </Card>
      <Card className="border-border/70 bg-background/70">
        <CardHeader>
          <CardTitle>{quickLinksLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.value.includes("@") && !link.value.startsWith("http") ? `mailto:${link.value}` : link.value}
              className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 transition-colors hover:border-foreground/40"
            >
              <span className="text-muted-foreground">{link.label}</span>
              <span className="font-semibold">{link.value}</span>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
