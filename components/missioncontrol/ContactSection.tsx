import { Linkedin, Mail, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PORTFOLIO } from "@/lib/data";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <Card className="border-border/60 bg-background/70">
        <CardHeader>
          <CardTitle>{PORTFOLIO.contact.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{PORTFOLIO.contact.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                Email
              </div>
              <a
                href={`mailto:${PORTFOLIO.contact.email}`}
                className="break-all text-sm font-medium hover:text-blue-600 hover:underline"
              >
                {PORTFOLIO.contact.email}
              </a>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                Phone
              </div>
              <a
                href={`tel:${PORTFOLIO.contact.phone}`}
                className="text-sm font-medium hover:text-blue-600 hover:underline"
              >
                {PORTFOLIO.contact.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </div>
              <a
                href={PORTFOLIO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
            <p className="mb-3 text-sm font-semibold">{PORTFOLIO.recruiterSummary.title}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {PORTFOLIO.recruiterSummary.bullets.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
