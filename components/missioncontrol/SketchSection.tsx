"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO } from "@/lib/data";
import { getFadeUp, getStagger } from "@/styles/motion";

export function SketchSection() {
  const reduced = useReducedMotion() ?? false;
  const fadeUp = getFadeUp(reduced);
  const stagger = getStagger(reduced);

  return (
    <section id="sketch" className="section-shell">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {PORTFOLIO.sketchToSystem.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold">{PORTFOLIO.sketchToSystem.title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{PORTFOLIO.sketchToSystem.intro}</p>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} className="grid gap-6 md:grid-cols-2">
          {PORTFOLIO.sketchToSystem.items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <Card id={`sketch-${item.id}`} className="overflow-hidden border-border/60 bg-background/70">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-border/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid gap-4 text-xs text-muted-foreground md:grid-cols-3">
                    {(["sketch", "system", "production"] as const).map((key) => (
                      <div key={`${item.id}-${key}`} className="space-y-2">
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                          {PORTFOLIO.sketchToSystem.labels[key]}
                        </p>
                        <ul className="space-y-1">
                          {item.sections[key].map((line) => (
                            <li key={line}>• {line}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    {item.artifacts.map((artifact) => (
                      <p key={artifact.label}>
                        {artifact.image ? (
                          <span className="inline-flex items-center gap-2">
                            <span>{artifact.label}</span>
                            <span className="rounded-full border border-border/60 px-2 py-0.5 text-[0.65rem]">
                              image
                            </span>
                          </span>
                        ) : (
                          artifact.label
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
