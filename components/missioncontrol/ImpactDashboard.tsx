"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PORTFOLIO } from "@/lib/data";
import { getFadeUp, getStagger } from "@/styles/motion";

export function ImpactDashboard() {
  const reduced = useReducedMotion() ?? false;
  const fadeUp = getFadeUp(reduced);
  const stagger = getStagger(reduced);

  return (
    <section id="impact" className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{PORTFOLIO.impact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold">{PORTFOLIO.impact.title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{PORTFOLIO.impact.intro}</p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-4 md:grid-cols-2"
        >
          {PORTFOLIO.impact.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className="rounded-3xl border border-border/60 bg-background/70 p-4 shadow-glass"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-xl font-semibold">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle>{PORTFOLIO.impact.productionReadiness.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {PORTFOLIO.impact.productionReadiness.items.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-muted-foreground">{item.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle>{PORTFOLIO.profile.primaryTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{PORTFOLIO.hero.subheadline}</p>
              {PORTFOLIO.recruiterSummary.bullets.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
