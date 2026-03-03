import type { Doc } from "@/lib/portfolioDocs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Source = { id: string; title: string; url: string };

export type AnswerMode = "recruiter" | "engineering" | "executive";
export type AnswerLength = "quick" | "deep";

export type AgentAnswer = {
  answer: string;
  bullets?: string[];
  followUps: string[];
  sources: Source[];
};

const getServerLlmConfig = () => {
  const provider = (process.env.PORTFOLIO_LLM_PROVIDER ?? "openai").toLowerCase();
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.PORTFOLIO_LLM_API_KEY;
  const model = process.env.OPENAI_MODEL ?? process.env.PORTFOLIO_LLM_MODEL ?? "gpt-4o-mini";
  return { provider, apiKey, model };
};

const SYSTEM_PROMPT = `
You are an AI assistant representing Nikhil Tanappagol's portfolio. Respond in first-person as if you are Nikhil.

CRITICAL RULES:
1. Use ONLY the provided context documents - never invent facts, numbers, or projects
2. Focus on helping recruiters/hiring managers understand why Nikhil is interview-worthy
3. Highlight: ownership, impact, production systems, and real-world constraints
4. Keep responses concise, scannable, and recruiter-friendly

SKILL COVERAGE - GIVE EQUAL WEIGHT TO ALL AREAS:
Nikhil's expertise spans THREE major domains (cover all equally):

1. **ML/AI Systems** (Primary Strength):
   - Production ML models: Markdown Optimization, NLP sentiment analysis, forecasting, recommenders
   - MLOps: DVC pipelines, model registry, CI/CD, evaluation frameworks
   - Feature engineering, explainability, guardrails, offline evaluation
   - AI integration: RAG systems, voice agents, LLM workflows

2. **Mobile + Backend Systems**:
   - iOS: Swift, SwiftUI, payment flows, device integrations
   - Backend: Node.js, RESTful APIs, orchestration, data pipelines
   - PWA: React, TypeScript, offline-first workflows

3. **Enterprise Retail Operations**:
   - Payment systems (multi-tender wallet, refund engine)
   - Store devices (Zebra printers, scanners, BLE)
   - Production reliability, observability, guardrails

RESPONSE STRATEGY:
- Lead with the most impressive/relevant point first
- Balance coverage across ML/AI, mobile, and backend (don't over-emphasize iOS)
- Use bullets to make key achievements scannable
- Emphasize production systems, scale, and business impact
- Show technical depth without jargon overload
- End with follow-ups that guide toward interview topics

INTERVIEW-FOCUSED FRAMING:
- For technical questions: Show depth + production experience + tradeoffs across ML, mobile, and backend
- For role questions: Emphasize leadership, ownership, and cross-team impact
- For project questions: Focus on constraints solved, outcomes delivered, and lessons learned
- For ML questions: Highlight feature engineering, evaluation, explainability, and production deployment

OUTPUT FORMAT (JSON):
{
  "answer": "One compelling sentence that makes the recruiter want to interview you",
  "bullets": ["Key achievement 1", "Key achievement 2", "Key achievement 3"],
  "followUps": ["Follow-up question 1?", "Follow-up question 2?"]
}

NEVER include raw data dumps, URLs, or contact info in the answer (unless specifically asked for contact details).
`.trim();

const dedupeSources = (docs: Doc[]) => {
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const doc of docs) {
    if (seen.has(doc.id)) continue;
    seen.add(doc.id);
    sources.push({ id: doc.id, title: doc.title, url: doc.url });
    if (sources.length === 3) break;
  }
  return sources;
};

const getModeGuidance = (mode: AnswerMode) => {
  if (mode === "engineering") {
    return `ENGINEERING MODE: Emphasize technical architecture, implementation challenges, technology choices, and engineering tradeoffs. Balance coverage across:
    - ML/AI: Feature engineering, model architecture, evaluation metrics, MLOps pipelines
    - Mobile/Backend: System design, API contracts, data flow, reliability patterns
    - Production: Guardrails, observability, deployment strategies
    Show deep technical expertise across all domains.`;
  }
  if (mode === "executive") {
    return `EXECUTIVE MODE: Focus on business outcomes, risk mitigation, team impact, and strategic decisions. Highlight:
    - ML/AI impact: Revenue optimization, operational efficiency, decision support
    - System reliability: Uptime, error reduction, user experience improvements
    - Cross-functional leadership: Mobile, backend, ML, and operations alignment
    Quantify impact where possible.`;
  }
  return `RECRUITER MODE: Focus on role fit, ownership scope, and interview-worthy achievements. Make it easy for a recruiter to pitch you to a hiring manager. Highlight:
    - 9+ years experience across ML/AI, mobile, and backend systems
    - Production ML models (pricing, forecasting, NLP, recommenders)
    - Enterprise retail systems (payments, devices, operations)
    - End-to-end ownership: ML model → mobile app → backend → production
    Balance coverage - don't over-emphasize iOS at the expense of ML/AI work.`;
};

const getLengthGuidance = (length: AnswerLength) => {
  if (length === "deep") {
    return `DEEP MODE: Provide comprehensive answer with 3 detailed bullets. Include specific examples, constraints overcome, and technical/business context. Show the full story.`;
  }
  return `QUICK MODE: Provide concise answer with 1-2 punchy bullets. Focus on the most impressive/relevant points. Keep it scannable for busy recruiters.`;
};

const fallbackFromContext = (contextDocs: Doc[], mode: AnswerMode): Omit<AgentAnswer, "sources"> => {
  const top = contextDocs[0];
  if (!top) {
    return {
      answer: "I don’t have enough portfolio context for that yet.",
      bullets: ["Please add the missing detail in the relevant section so I can answer accurately."],
      followUps: ["Want me to answer from Case Studies instead?", "Want me to answer from AI Lab instead?"],
    };
  }

  const sentence = top.text
    .split(/(?<=[.!?])\s+/)
    .find((chunk) => chunk.trim().length > 20)
    ?.trim();

  const factualBullets = top.text
    .split(/[.;]/)
    .map((part) => part.trim())
    .filter((part) => part.length > 18)
    .slice(0, mode === "recruiter" ? 2 : 3);

  return {
    answer: sentence ?? `${top.title} is the most relevant section for this question.`,
    bullets: factualBullets,
    followUps: ["Want details on ownership?", "Want a deeper technical breakdown?"],
  };
};

const parseStructuredResponse = (raw: string) => {
  try {
    const parsed = JSON.parse(raw) as {
      answer?: unknown;
      bullets?: unknown;
      followUps?: unknown;
    };
    const answer = typeof parsed.answer === "string" ? parsed.answer.trim() : "";
    const bullets = Array.isArray(parsed.bullets)
      ? parsed.bullets.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 3)
      : [];
    const followUps = Array.isArray(parsed.followUps)
      ? parsed.followUps
          .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
          .slice(0, 2)
      : [];
    return { answer, bullets, followUps };
  } catch {
    return { answer: "", bullets: [], followUps: [] as string[] };
  }
};

export async function generateAnswer({
  messages,
  contextDocs,
  mode,
  length,
}: {
  messages: ChatMessage[];
  contextDocs: Doc[];
  mode: AnswerMode;
  length: AnswerLength;
}): Promise<AgentAnswer> {
  const { provider, apiKey, model } = getServerLlmConfig();
  const sources = dedupeSources(contextDocs);

  if (!contextDocs.length) {
    return {
      answer: "I don’t have that detail in my current portfolio context.",
      bullets: ["Please add it in Case Studies, AI Lab, or Contact so I can answer accurately."],
      followUps: ["Want me to summarize available case studies?", "Want me to summarize AI models instead?"],
      sources,
    };
  }

  if (!provider || !apiKey || provider !== "openai") {
    const fallback = fallbackFromContext(contextDocs, mode);
    return { ...fallback, sources };
  }

  const context = contextDocs
    .map((doc, index) => `${index + 1}. ${doc.title} (${doc.url})\n${doc.text}`)
    .join("\n\n");

  const openAiMessages = [
    {
      role: "system",
      content: [SYSTEM_PROMPT, getModeGuidance(mode), getLengthGuidance(length), `Context docs:\n${context}`].join("\n\n"),
    },
    ...messages.map((message) => ({ role: message.role, content: message.content })),
  ];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: openAiMessages,
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = data.choices?.[0]?.message?.content ?? "";
    const parsed = parseStructuredResponse(raw);

    if (!parsed.answer) {
      const fallback = fallbackFromContext(contextDocs, mode);
      return { ...fallback, sources };
    }

    return {
      answer: parsed.answer,
      bullets: parsed.bullets.length ? parsed.bullets : undefined,
      followUps:
        parsed.followUps.length === 2
          ? parsed.followUps
          : ["Want details on one flagship case study?", "Want this in recruiter or engineering mode?"],
      sources,
    };
  } catch {
    const fallback = fallbackFromContext(contextDocs, mode);
    return { ...fallback, sources };
  }
}
