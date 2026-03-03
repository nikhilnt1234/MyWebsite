"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CaseStudyScroller() {
  const studies = PORTFOLIO.caseStudies.featured;
  const [activeId, setActiveId] = useState<string>(studies[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) setActiveId(id);
          }
        });
      },
      { threshold: 0.45 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeStudy = useMemo(
    () => studies.find((study) => study.id === activeId) ?? studies[0],
    [activeId, studies]
  );

  const handleSelect = (id: string) => {
    setActiveId(id);
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="case-studies" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {PORTFOLIO.caseStudies.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold">{PORTFOLIO.caseStudies.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{activeStudy.oneLiner}</p>
          <div className="mt-6 grid gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{PORTFOLIO.caseStudies.labels.proof}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PORTFOLIO.caseStudies.proofTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="rounded-3xl border border-border/60 bg-background/70 p-4 shadow-glass"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{tile.label}</p>
                  <p className="mt-2 text-lg font-semibold">{tile.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{tile.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {studies.map((study) => (
              <button
                key={study.id}
                type="button"
                onClick={() => handleSelect(study.id)}
                className={cn(
                  "rounded-2xl border border-border/60 px-4 py-3 text-left transition-colors",
                  study.id === activeId ? "bg-muted/40" : "bg-background/60"
                )}
              >
                <p className="text-sm font-semibold">{study.title}</p>
                <p className="text-xs text-muted-foreground">{study.domain}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {studies.map((study) => (
            <article
              key={study.id}
              id={`case-${study.id}`}
              data-id={study.id}
              ref={(el) => {
                sectionRefs.current[study.id] = el;
              }}
              className="space-y-6 scroll-mt-24"
            >
              <div>
                <h3 className="text-2xl font-semibold">{study.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{study.oneLiner}</p>
                {study.signals?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.signals.map((signal) => (
                      <Badge key={signal} variant="outline" className="border-border/60">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
              {study.sections[0] ? (
                <Card className="border-border/60 bg-background/70">
                  <CardHeader>
                    <CardTitle>{study.sections[0].title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    {study.sections[0].items.map((item) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
              {study.sections.length > 1 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {study.sections.slice(1, 3).map((section) => (
                    <Card key={`${study.id}-${section.title}`} className="border-border/60 bg-background/70">
                      <CardHeader>
                        <CardTitle>{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        {section.items.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : null}
              {study.sections.length > 3 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {study.sections.slice(3).map((section) => (
                    <Card key={`${study.id}-${section.title}-extra`} className="border-border/60 bg-background/70">
                      <CardHeader>
                        <CardTitle>{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        {section.items.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : null}
              <Card className="border-border/60 bg-background/70">
                <CardHeader>
                  <CardTitle>{PORTFOLIO.caseStudies.labels.tags}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {study.tags.map((item) => (
                    <Badge key={item} variant="outline" className="border-border/60">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </article>
          ))}
          {PORTFOLIO.caseStudies.more.length ? (
            <details className="rounded-3xl border border-border/60 bg-background/70 px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                {PORTFOLIO.caseStudies.labels.more}
                <span className="text-xs text-muted-foreground">
                  {PORTFOLIO.caseStudies.more.length} items
                </span>
              </summary>
              <div className="mt-4 grid gap-4">
                {PORTFOLIO.caseStudies.more.map((study) => (
                  <div
                    key={study.id}
                    className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{study.title}</p>
                      <span className="text-xs text-muted-foreground">{study.domain}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{study.oneLiner}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <Badge key={`${study.id}-${tag}`} variant="outline" className="border-border/60">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  );
}
