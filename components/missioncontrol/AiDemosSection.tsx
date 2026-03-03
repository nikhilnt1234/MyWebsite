"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO } from "@/lib/data";
import { PortfolioChatModal } from "@/components/PortfolioChatModal";
import { getFadeUp, getStagger } from "@/styles/motion";

export function AiDemosSection() {
  const reduced = useReducedMotion() ?? false;
  const fadeUp = getFadeUp(reduced);
  const stagger = getStagger(reduced);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <section id="ai-lab" className="section-shell">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{PORTFOLIO.aiLab.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold">{PORTFOLIO.aiLab.title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{PORTFOLIO.aiLab.intro}</p>
          <div className="mt-5">
            <Button onClick={() => setChatOpen(true)}>{PORTFOLIO.qaAgent.openModalLabel}</Button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {PORTFOLIO.aiLab.models.title}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{PORTFOLIO.aiLab.models.intro}</p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="grid gap-3"
          >
            {PORTFOLIO.aiLab.models.items.map((model) => (
              <motion.div key={model.id} variants={fadeUp}>
                <details id={`ai-model-${model.id}`} className="rounded-3xl border border-border/60 bg-background/70 px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{model.title}</p>
                      <p className="text-xs text-muted-foreground">{model.summary}</p>
                    </div>
                    <Badge variant="outline" className="border-border/60">
                      {model.status}
                    </Badge>
                  </summary>
                  <div className="mt-4 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                    {PORTFOLIO.aiLab.models.sections.map((section) => {
                      const value = model[section.key as keyof typeof model];
                      return (
                        <div key={`${model.id}-${section.key}`}>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{section.label}</p>
                          <p className="mt-1">{String(value)}</p>
                        </div>
                      );
                    })}
                  </div>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6"
        >
          {PORTFOLIO.aiLab.demos.map((demo) => (
            <motion.div key={demo.id} variants={fadeUp}>
              <Card className="border-border/60 bg-background/70">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <CardTitle>{demo.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{demo.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {demo.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-border/60">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-4 rounded-3xl border border-border/60 bg-muted/30 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {PORTFOLIO.aiLab.labels.goal}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{demo.modelCard.goal}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {PORTFOLIO.aiLab.labels.prompts}
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {demo.starterPrompts.map((prompt) => (
                          <li key={prompt}>• {prompt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Card className="border-border/60 bg-background/80">
                    <CardHeader>
                      <CardTitle>{PORTFOLIO.aiLab.labels.modelCard}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {PORTFOLIO.aiLab.labels.latency}
                        </p>
                        <p className="mt-1 font-semibold">{demo.modelCard.latencyTarget}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {PORTFOLIO.aiLab.labels.guardrails}
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {demo.modelCard.guardrails.map((rail) => (
                            <li key={rail}>• {rail}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {PORTFOLIO.aiLab.labels.evaluation}
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {demo.modelCard.evaluation.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <PortfolioChatModal open={chatOpen} onOpenChange={setChatOpen} />
    </section>
  );
}
