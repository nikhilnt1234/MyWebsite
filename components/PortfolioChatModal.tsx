"use client";

import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, Copy, ExternalLink, X } from "lucide-react";

import { PortfolioChat } from "@/components/PortfolioChat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";

type PortfolioChatModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getProofActionLabel = (type: string) => {
  if (type === "Gemini App") return PORTFOLIO.aiLab.proofRail.openDemoLabel;
  if (type === "YouTube") return PORTFOLIO.aiLab.proofRail.watchLabel;
  return PORTFOLIO.aiLab.proofRail.readLabel;
};

export function PortfolioChatModal({ open, onOpenChange }: PortfolioChatModalProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "proof" | "contact">("chat");
  const [copiedField, setCopiedField] = useState<"email" | "phone" | "linkedin" | null>(null);

  useEffect(() => {
    if (!open) {
      setActiveTab("chat");
      setCopiedField(null);
    }
  }, [open]);

  const copyText = async (field: "email" | "phone" | "linkedin", value: string) => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1200);
    } catch {
      setCopiedField(null);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(96vw,1100px)] max-w-5xl -translate-x-1/2 -translate-y-1/2",
            "max-h-[90vh] overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-lg"
          )}
        >
          <div className="flex h-full max-h-[90vh] flex-col">
            <header className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-4">
              <div>
                <DialogPrimitive.Title className="text-xl font-semibold">Ask Nikhil</DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                  {PORTFOLIO.qaAgent.modalHelper}
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground"
                  aria-label={PORTFOLIO.qaAgent.closeModalLabel}
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogPrimitive.Close>
            </header>

            <div className="min-h-0 flex-1 px-6 pb-5 pt-4">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "chat" | "proof" | "contact")}
                className="flex h-full min-h-0 flex-col"
              >
                <TabsList className="w-fit">
                  <TabsTrigger value="chat">{PORTFOLIO.qaAgent.modalTabs.chat}</TabsTrigger>
                  <TabsTrigger value="proof">{PORTFOLIO.qaAgent.modalTabs.proof}</TabsTrigger>
                  <TabsTrigger value="contact">{PORTFOLIO.qaAgent.modalTabs.contact}</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="mt-4 min-h-0 flex-1">
                  <PortfolioChat compact className="h-[min(68vh,640px)]" />
                </TabsContent>

                <TabsContent value="proof" className="mt-4 min-h-0 flex-1">
                  <div className="grid max-h-[68vh] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
                    {PORTFOLIO.publicLinks.map((link) => (
                      <article key={link.url} className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{link.type}</p>
                        <p className="mt-2 text-sm">{link.title}</p>
                        <Button asChild size="sm" variant="outline" className="mt-4 w-full justify-between">
                          <a href={link.url} target="_blank" rel="noreferrer">
                            {getProofActionLabel(link.type)}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </article>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-4 min-h-0 flex-1">
                  <div className="grid max-h-[68vh] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {PORTFOLIO.aiLab.proofRail.emailLabel}
                      </p>
                      <p className="mt-2 break-all text-sm">{PORTFOLIO.contact.email}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4 w-full justify-between"
                        onClick={() => copyText("email", PORTFOLIO.contact.email)}
                      >
                        {copiedField === "email" ? PORTFOLIO.aiLab.proofRail.copiedLabel : PORTFOLIO.aiLab.proofRail.copyLabel}
                        {copiedField === "email" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {PORTFOLIO.aiLab.proofRail.phoneLabel}
                      </p>
                      <p className="mt-2 text-sm">{PORTFOLIO.contact.phone}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4 w-full justify-between"
                        onClick={() => copyText("phone", PORTFOLIO.contact.phone)}
                      >
                        {copiedField === "phone" ? PORTFOLIO.aiLab.proofRail.copiedLabel : PORTFOLIO.aiLab.proofRail.copyLabel}
                        {copiedField === "phone" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {PORTFOLIO.aiLab.proofRail.linkedinLabel}
                      </p>
                      <p className="mt-2 break-all text-sm">{PORTFOLIO.contact.linkedin}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="justify-between"
                          onClick={() => copyText("linkedin", PORTFOLIO.contact.linkedin)}
                        >
                          {copiedField === "linkedin" ? PORTFOLIO.aiLab.proofRail.copiedLabel : PORTFOLIO.aiLab.proofRail.copyLabel}
                          {copiedField === "linkedin" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <a href={PORTFOLIO.contact.linkedin} target="_blank" rel="noreferrer">
                            Open LinkedIn
                            <ExternalLink className="ml-2 h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
