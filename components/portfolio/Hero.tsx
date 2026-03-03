"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

import { PORTFOLIO } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-16">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.3em]">{PORTFOLIO.profile.primaryTitle}</span>
            <span className="text-border">·</span>
            <a
              href={PORTFOLIO.profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              aria-label="View LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
              <span>{PORTFOLIO.profile.name}</span>
            </a>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">{PORTFOLIO.hero.headline}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{PORTFOLIO.hero.subheadline}</p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {PORTFOLIO.hero.chips.map((chip) => (
            <Badge key={`${chip.label}-${chip.value}`} variant="outline" className="border-border/60 bg-background/60">
              {chip.label}: {chip.value}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <a href={`#${PORTFOLIO.navItems.find((item) => item.id === "case-studies")?.id ?? "case-studies"}`}>
              {PORTFOLIO.hero.primaryCTA}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`#${PORTFOLIO.navItems.find((item) => item.id === "ai-lab")?.id ?? "ai-lab"}`}>
              {PORTFOLIO.hero.secondaryCTA}
            </a>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {PORTFOLIO.hero.proofBullets.slice(0, 3).map((point) => (
            <div key={point} className="glass-panel rounded-3xl px-5 py-4 shadow-glow">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {PORTFOLIO.recruiterSummary.title}
              </p>
              <p className="mt-2 text-base font-semibold">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
