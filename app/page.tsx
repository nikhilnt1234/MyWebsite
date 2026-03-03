"use client";

import { useState } from "react";

import { CommandPalette } from "@/components/CommandPalette";
import { CaseStudyScroller } from "@/components/CaseStudyScroller";
import { MissionBackdrop } from "@/components/missioncontrol/MissionBackdrop";
import { NavigationRail } from "@/components/missioncontrol/NavigationRail";
import { MissionHero } from "@/components/missioncontrol/MissionHero";
import { AiDemosSection } from "@/components/missioncontrol/AiDemosSection";
import { SketchSection } from "@/components/missioncontrol/SketchSection";
import { ContactSection } from "@/components/missioncontrol/ContactSection";
import { PORTFOLIO } from "@/lib/data";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openCommandPalette = () => setPaletteOpen(true);

  const handleCommandAction = (action: (typeof PORTFOLIO.commandPalette.actions)[number]) => {
    if ("section" in action) {
      const el = document.querySelector(action.section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if ("action" in action && action.action === "COPY_RECRUITER_SUMMARY") {
      const text = PORTFOLIO.recruiterSummary.bullets.join("\n");
      navigator.clipboard?.writeText(text);
    }
    if ("href" in action) {
      window.open(action.href, "_blank");
    }
    setPaletteOpen(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MissionBackdrop />
      <NavigationRail />
      <div className="lg:pl-72">
        <MissionHero onCommand={openCommandPalette} />
        <CaseStudyScroller />
        <AiDemosSection />
        <SketchSection />
        <ContactSection />
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onAction={handleCommandAction} />
    </main>
  );
}
