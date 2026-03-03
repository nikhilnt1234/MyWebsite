"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, Bot, Check, Copy, Loader2, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";

type Source = { id?: string; title: string; url: string };

type UserMessage = {
  role: "user";
  content: string;
};

type AssistantMessage = {
  role: "assistant";
  kind: "profile" | "answer" | "error" | "missing" | "contact";
  query: string;
  answer: string;
  bullets?: string[];
  followUps?: string[];
  sources: Source[];
  contact?: {
    email: string;
    phone: string;
    linkedin: string;
  };
  publicLinks?: Array<{ type: string; title: string; url: string }>;
};

type ChatMessage = UserMessage | AssistantMessage;

type PortfolioChatProps = {
  className?: string;
  queuedPrompt?: string | null;
  onPromptConsumed?: () => void;
  compact?: boolean;
};

const dedupeSources = (sources: Source[]) => {
  const unique = new Map<string, Source>();
  for (const source of sources) {
    if (!unique.has(source.url)) unique.set(source.url, source);
  }
  return Array.from(unique.values()).slice(0, 3);
};

export function PortfolioChat({ className, queuedPrompt, onPromptConsumed, compact = false }: PortfolioChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"recruiter" | "engineering" | "executive">("recruiter");
  const [lengthMode, setLengthMode] = useState<"quick" | "deep">("quick");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = useCallback(
    async (content: string, overrideLength?: "quick" | "deep") => {
      const trimmed = content.trim();
      if (!trimmed) return;

      const nextUserMessage: UserMessage = { role: "user", content: trimmed };
      const nextMessages = [...messages, nextUserMessage];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const response = await fetch("/api/portfolio-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((message) =>
              message.role === "assistant"
                ? { role: "assistant", content: message.answer }
                : { role: "user", content: message.content }
            ),
            mode,
            length: overrideLength ?? lengthMode,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Request failed");
        }

        const data = (await response.json()) as {
          kind: "profile" | "answer" | "error" | "missing" | "contact";
          answer: string;
          bullets?: string[];
          followUps?: string[];
          sources?: Source[];
          contact?: {
            email: string;
            phone: string;
            linkedin: string;
          };
          publicLinks?: Array<{ type: string; title: string; url: string }>;
        };

        const assistantMessage: AssistantMessage = {
          role: "assistant",
          kind: data.kind,
          query: trimmed,
          answer: data.answer,
          bullets: data.bullets?.slice(0, 3),
          followUps:
            data.kind === "error" || data.kind === "missing"
              ? undefined
              : (data.followUps?.slice(0, 2) ?? PORTFOLIO.qaAgent.followUpFallback.slice(0, 2)).filter(Boolean),
          sources: dedupeSources(data.sources ?? []),
          contact: data.contact,
          publicLinks: data.publicLinks,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            kind: "error",
            query: trimmed,
            answer: "Service unavailable. Retry.",
            sources: [],
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [lengthMode, messages, mode]
  );

  const copyAssistantAnswer = async (message: AssistantMessage, index: number) => {
    const payload = [message.answer, ...(message.bullets ?? []).map((bullet) => `- ${bullet}`)]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard?.writeText(payload);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 1100);
    } catch {
      setCopiedIndex(null);
    }
  };

  useEffect(() => {
    if (!queuedPrompt) return;
    onPromptConsumed?.();
    void sendMessage(queuedPrompt);
  }, [onPromptConsumed, queuedPrompt, sendMessage]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTop = viewport.scrollHeight;
  }, [messages, loading]);

  return (
    <Card className={cn("flex h-[min(720px,calc(100vh-220px))] flex-col border-border/60 bg-background/70", className)}>
      {!compact ? (
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {PORTFOLIO.qaAgent.title}
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">{PORTFOLIO.qaAgent.description}</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 px-2 py-1">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">AI-Powered</p>
            </div>
          </div>
        </CardHeader>
      ) : null}

      <CardContent className={cn("flex min-h-0 flex-1 flex-col", compact ? "pt-5" : "pt-0")}>
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div className="flex max-h-[72px] flex-1 flex-wrap gap-2 overflow-hidden">
            {PORTFOLIO.qaAgent.quickChips.map((chip) => (
              <Button
                key={chip.label}
                variant="secondary"
                size="sm"
                className="h-8 max-w-[170px] truncate"
                onClick={() => sendMessage(chip.question)}
                title={chip.question}
              >
                {chip.label}
              </Button>
            ))}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((open) => !open)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:text-foreground"
              aria-label={PORTFOLIO.qaAgent.settingsLabel}
            >
              <Settings2 className="h-4 w-4" />
            </button>
            {settingsOpen ? (
              <div className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-border/70 bg-background/95 p-3 shadow-lg">
                <div className="space-y-3 text-xs">
                  <label className="block space-y-1">
                    <span className="uppercase tracking-[0.2em] text-muted-foreground">
                      {PORTFOLIO.qaAgent.settingsModeLabel}
                    </span>
                    <select
                      className="w-full rounded-md border border-border/70 bg-background px-2 py-1 text-xs"
                      value={mode}
                      onChange={(event) => setMode(event.target.value as typeof mode)}
                    >
                      {PORTFOLIO.qaAgent.modes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block space-y-1">
                    <span className="uppercase tracking-[0.2em] text-muted-foreground">
                      {PORTFOLIO.qaAgent.settingsDepthLabel}
                    </span>
                    <select
                      className="w-full rounded-md border border-border/70 bg-background px-2 py-1 text-xs"
                      value={lengthMode}
                      onChange={(event) => setLengthMode(event.target.value as typeof lengthMode)}
                    >
                      {PORTFOLIO.qaAgent.lengths.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-border/60 bg-muted/20">
          <div ref={viewportRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background/90">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <span>Portfolio Agent</span>
            </div>

            {messages.length === 0 ? (
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900">
                <p className="text-sm font-medium">👋 Hi! I&apos;m an AI assistant trained on Nikhil&apos;s portfolio.</p>
                <p className="text-sm text-slate-700">
                  Ask me about:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  <li>• Specific projects (Digital Wallet, SmartMarkdown, Refund Engine)</li>
                  <li>• Technical decisions and constraints solved</li>
                  <li>• Production AI systems with guardrails</li>
                  <li>• Why Nikhil would be a great fit for Innovation Lead roles</li>
                </ul>
                <p className="text-xs text-slate-500">
                  💡 Tip: Use the quick chips above or ask your own question!
                </p>
              </div>
            ) : null}

            {messages.map((message, index) =>
              message.role === "user" ? (
                <div
                  key={`user-${index}`}
                  className="ml-auto max-w-[95%] break-words rounded-2xl bg-slate-900 px-4 py-3 text-[14px] leading-6 text-white shadow-sm sm:max-w-[82%] sm:text-[15px]"
                >
                  <p className="break-words">{message.content}</p>
                </div>
              ) : (
                <div
                  key={`assistant-${index}`}
                  className="max-w-[95%] space-y-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm sm:max-w-[90%]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-3">
                      <p className="text-[15px] leading-relaxed text-slate-900">{message.answer}</p>

                      {message.bullets?.length ? (
                        <ul className="space-y-1.5 text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
                          {message.bullets.slice(0, 3).map((bullet) => (
                            <li key={bullet} className="break-words">• {bullet}</li>
                          ))}
                        </ul>
                      ) : null}

                      {message.kind === "contact" && message.contact ? (
                        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                          <div className="space-y-2">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</span>
                              <a
                                href={`mailto:${message.contact.email}`}
                                className="break-all text-sm text-slate-900 hover:text-blue-600 hover:underline"
                              >
                                {message.contact.email}
                              </a>
                            </div>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Phone</span>
                              <a
                                href={`tel:${message.contact.phone}`}
                                className="text-sm text-slate-900 hover:text-blue-600 hover:underline"
                              >
                                {message.contact.phone}
                              </a>
                            </div>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">LinkedIn</span>
                              <a
                                href={message.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all text-sm text-slate-900 hover:text-blue-600 hover:underline"
                              >
                                View Profile
                              </a>
                            </div>
                          </div>

                          {message.publicLinks?.length ? (
                            <div className="space-y-2 border-t border-slate-200 pt-3">
                              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Public Links</span>
                              <div className="space-y-1.5">
                                {message.publicLinks.map((link, idx) => (
                                  <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 text-xs transition hover:border-slate-300 hover:shadow-sm"
                                  >
                                    <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[0.65rem] font-medium text-slate-600">
                                      {link.type}
                                    </span>
                                    <span className="min-w-0 flex-1 break-words text-slate-900">{link.title}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    {message.kind !== "error" && message.kind !== "missing" ? (
                      <button
                        type="button"
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:text-slate-900"
                        onClick={() => copyAssistantAnswer(message, index)}
                        aria-label={PORTFOLIO.qaAgent.copyLabel}
                      >
                        {copiedIndex === index ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    ) : null}
                  </div>

                  {message.kind === "error" ? (
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Service unavailable. Retry.</span>
                      <button
                        type="button"
                        className="rounded-full border border-slate-300 px-2 py-1"
                        onClick={() => sendMessage(message.query)}
                        disabled={loading}
                      >
                        Retry
                      </button>
                    </div>
                  ) : null}


                  {message.kind !== "error" && message.kind !== "missing" && message.followUps?.length ? (
                    <div className="space-y-1.5 border-t border-slate-200 pt-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Ask Next</p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {message.followUps.slice(0, 2).map((followUp) => (
                          <button
                            key={followUp}
                            type="button"
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900 sm:text-sm"
                            onClick={() => sendMessage(followUp)}
                          >
                            {followUp}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            )}

            {loading ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>{PORTFOLIO.qaAgent.loadingLabel}</span>
              </div>
            ) : null}
          </div>

          <div className="sticky bottom-0 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={PORTFOLIO.qaAgent.inputPlaceholder}
                aria-label={PORTFOLIO.qaAgent.inputPlaceholder}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
                className="flex-1"
              />
              <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} className="shrink-0">
                {PORTFOLIO.qaAgent.sendLabel}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
