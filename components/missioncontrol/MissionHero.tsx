"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Linkedin, Mail, Phone, Trophy } from "lucide-react";
import Image from "next/image";

import { PORTFOLIO } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFadeUp, getStagger } from "@/styles/motion";

export type MissionHeroProps = {
  onCommand: () => void;
};

const getYouTubeThumb = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
    }
  } catch {
    return "";
  }
  return "";
};

export function MissionHero({ onCommand }: MissionHeroProps) {
  const reduced = useReducedMotion() ?? false;
  const fadeUp = getFadeUp(reduced);
  const stagger = getStagger(reduced);

  const scrollToCaseStudies = () => {
    const el = document.getElementById("case-studies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="section-shell flex flex-col gap-8">
      <div id="overview" className="relative -top-20" aria-hidden />
      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
        <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {PORTFOLIO.profile.primaryTitle}
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl font-semibold leading-tight sm:text-5xl">
          {PORTFOLIO.hero.headline}
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
          {PORTFOLIO.hero.subheadline}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <Button onClick={scrollToCaseStudies}>{PORTFOLIO.hero.primaryCTA}</Button>
          <Button variant="outline" onClick={onCommand}>
            {PORTFOLIO.hero.secondaryCTA}
          </Button>
        </motion.div>
      </motion.div>

      {PORTFOLIO.highlights.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20">
              <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">{PORTFOLIO.highlights[0].title}</h3>
              <p className="text-sm text-muted-foreground">{PORTFOLIO.highlights[0].description}</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Connect</h3>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <a href={`mailto:${PORTFOLIO.contact.email}`} className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={`tel:${PORTFOLIO.contact.phone}`} className="gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={PORTFOLIO.contact.linkedin} target="_blank" rel="noopener noreferrer" className="gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Featured Work</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.publicLinks.map((link) => {
            const thumb = link.type === "YouTube" ? getYouTubeThumb(link.url) : "";
            return (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 transition-all hover:border-border hover:shadow-lg"
              >
                {thumb ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={thumb}
                      alt={link.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge variant="outline" className="absolute left-3 top-3 border-white/20 bg-black/40 text-[0.65rem] text-white backdrop-blur">
                      {link.type}
                    </Badge>
                  </div>
                ) : null}
                <div className="space-y-3 p-4">
                  {!thumb ? (
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="outline" className="text-[0.65rem]">
                        {link.type}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  ) : (
                    <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                  <p className="text-sm font-medium leading-snug">{link.title}</p>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
