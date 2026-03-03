"use client";

import { useState } from "react";
import { Bot, Check, ExternalLink, FileText, Linkedin, Mail, Phone, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";

type PublicProofRailProps = {
  className?: string;
  onPromptSelect?: (prompt: string) => void;
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

const getPublicLinkLabel = (type: string) => {
  if (type === "Gemini App") return PORTFOLIO.aiLab.proofRail.openDemoLabel;
  if (type === "YouTube") return PORTFOLIO.aiLab.proofRail.watchLabel;
  return PORTFOLIO.aiLab.proofRail.readLabel;
};

const getPublicLinkIcon = (type: string) => {
  if (type === "Gemini App") return Bot;
  if (type === "YouTube") return PlayCircle;
  return FileText;
};

export function PublicProofRail({ className, onPromptSelect }: PublicProofRailProps) {
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);

  const copyText = async (field: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1500);
    } catch {
      setCopiedField(null);
    }
  };

  return (
    <aside className={cn("space-y-4", className)}>
      <Card className="border-border/60 bg-background/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{PORTFOLIO.aiLab.proofRail.contactTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>{PORTFOLIO.aiLab.proofRail.emailLabel}</span>
              </div>
              <button
                type="button"
                className="rounded-full border border-border/60 px-2 py-1 text-[0.65rem] hover:bg-muted/60"
                onClick={() => copyText("email", PORTFOLIO.contact.email)}
              >
                {copiedField === "email" ? PORTFOLIO.aiLab.proofRail.copiedLabel : PORTFOLIO.aiLab.proofRail.copyLabel}
              </button>
            </div>
            <p className="mt-2 break-all text-xs">{PORTFOLIO.contact.email}</p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/30 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{PORTFOLIO.aiLab.proofRail.phoneLabel}</span>
              </div>
              <button
                type="button"
                className="rounded-full border border-border/60 px-2 py-1 text-[0.65rem] hover:bg-muted/60"
                onClick={() => copyText("phone", PORTFOLIO.contact.phone)}
              >
                {copiedField === "phone" ? PORTFOLIO.aiLab.proofRail.copiedLabel : PORTFOLIO.aiLab.proofRail.copyLabel}
              </button>
            </div>
            <p className="mt-2 text-xs">{PORTFOLIO.contact.phone}</p>
          </div>

          <Button asChild variant="outline" className="w-full justify-between">
            <a href={PORTFOLIO.contact.linkedin} target="_blank" rel="noreferrer">
              <span className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                {PORTFOLIO.aiLab.proofRail.linkedinLabel}
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-background/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{PORTFOLIO.aiLab.proofRail.publicDemosTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {PORTFOLIO.publicLinks.map((link) => {
            const thumb = link.type === "YouTube" ? getYouTubeThumb(link.url) : "";
            const Icon = getPublicLinkIcon(link.type);
            return (
              <article key={link.url} className="rounded-2xl border border-border/60 bg-muted/30 p-3">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={link.title}
                    className="mb-3 h-28 w-full rounded-xl border border-border/60 object-cover"
                    loading="lazy"
                  />
                ) : null}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="outline" className="mb-2 border-border/60 text-[0.65rem]">
                      {link.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{link.title}</p>
                  </div>
                  <Icon className="mt-1 h-4 w-4 text-muted-foreground" />
                </div>
                <Button asChild variant="ghost" size="sm" className="mt-3 w-full justify-between px-3">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {getPublicLinkLabel(link.type)}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </article>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-background/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{PORTFOLIO.aiLab.proofRail.quickPromptsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {PORTFOLIO.qaAgent.starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="flex w-full items-start justify-between gap-2 rounded-2xl border border-border/60 bg-muted/30 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50"
              onClick={() => onPromptSelect?.(prompt)}
            >
              <span>{prompt}</span>
              <Check className="mt-0.5 h-3.5 w-3.5 opacity-60" />
            </button>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
