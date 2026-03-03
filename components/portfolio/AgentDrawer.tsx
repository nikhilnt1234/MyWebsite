"use client";

import { useEffect, useMemo, useState } from "react";
import { Mic } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AGENT, type AgentMessage } from "@/lib/data";
import { cn } from "@/lib/utils";

type AgentDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: "chat" | "voice";
  onTabChange: (tab: "chat" | "voice") => void;
  prefillQuery: string;
};

type Message = AgentMessage & {
  sources?: string[];
  confidence?: string;
};

export function AgentDrawer({
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  prefillQuery
}: AgentDrawerProps) {
  const initialMessages = useMemo(() => AGENT.chat.seedMessages as Message[], []);
  const [messages, setMessages] = useState<Message[]>(() => initialMessages);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(prefillQuery);
  }, [prefillQuery]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const assistantMessage: Message = {
      role: "assistant",
      content: AGENT.chat.mockReply,
      sources: AGENT.chat.sources,
      confidence: AGENT.chat.confidence
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>{AGENT.title}</SheetTitle>
          <SheetDescription>{AGENT.description}</SheetDescription>
        </SheetHeader>
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as "chat" | "voice")}>
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">
              {AGENT.tabs.chat}
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex-1">
              {AGENT.tabs.voice}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="space-y-4">
            <div className="flex h-[360px] flex-col gap-4 overflow-y-auto rounded-2xl border border-border/60 bg-muted/30 p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[85%] space-y-2 rounded-2xl border border-border/60 px-4 py-3 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-foreground text-background"
                      : "bg-background/80"
                  )}
                >
                  <p>{message.content}</p>
                  {message.role === "assistant" ? (
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-border/60">
                        {AGENT.chat.sourcesLabel}: {message.sources?.join(", ")}
                      </Badge>
                      <Badge variant="outline" className="border-border/60">
                        {AGENT.chat.confidenceLabel}: {message.confidence}
                      </Badge>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={AGENT.chat.inputPlaceholder}
                aria-label={AGENT.chat.inputPlaceholder}
              />
              <Button onClick={handleSend}>{AGENT.chat.sendLabel}</Button>
            </div>
          </TabsContent>
          <TabsContent value="voice" className="space-y-4">
            <div className="rounded-3xl border border-border/60 bg-muted/30 p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <Button variant="secondary" className="h-16 w-16 rounded-full" aria-label={AGENT.voice.pushToTalkLabel}>
                  <Mic className="h-6 w-6" />
                </Button>
                <div>
                  <p className="text-sm font-semibold">{AGENT.voice.pushToTalkLabel}</p>
                  <p className="text-xs text-muted-foreground">{AGENT.voice.helperText}</p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{AGENT.voice.transcriptLabel}</p>
                <p className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm">
                  {AGENT.voice.transcript}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{AGENT.voice.pipelineLabel}</p>
              <div className="flex flex-wrap gap-2">
                {AGENT.voice.pipeline.map((step) => (
                  <Badge key={step} variant="outline" className="border-border/60">
                    {step}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
