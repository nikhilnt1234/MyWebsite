import { NextResponse } from "next/server";

import { PORTFOLIO } from "@/lib/data";
import { generateAnswer } from "@/lib/llm";
import { getPortfolioDocs } from "@/lib/portfolioDocs";
import { retrieve, tokenize } from "@/lib/retrieve";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
  mode?: "recruiter" | "engineering" | "executive";
  length?: "quick" | "deep";
};

type ChatResponse = {
  kind: "profile" | "answer" | "error" | "missing" | "contact";
  answer: string;
  bullets?: string[];
  sources: { title: string; url: string }[];
  followUps?: string[];
  contact?: {
    email: string;
    phone: string;
    linkedin: string;
  };
  publicLinks?: Array<{ type: string; title: string; url: string }>;
};

const PROFILE_INTENT_TOKENS = new Set([
  "contact",
  "email",
  "phone",
  "linkedin",
  "reach",
]);

const ROUTE_TIMEOUT_MS = 12000;

const getProfileAnswer = (query: string): ChatResponse => {
  const lower = query.toLowerCase();

  if (/(contact|reach|email|phone|linkedin|call|message)/i.test(lower)) {
    return {
      kind: "contact",
      answer: "Here's how to reach me:",
      contact: {
        email: PORTFOLIO.contact.email,
        phone: PORTFOLIO.contact.phone,
        linkedin: PORTFOLIO.contact.linkedin,
      },
      publicLinks: [...PORTFOLIO.publicLinks],
      sources: [{ title: "Profile", url: "#overview" }, { title: "Contact", url: "#contact" }],
      followUps: ["Want to see my public demos and videos?", "Want a recruiter-ready summary to forward?"],
    };
  }

  return {
    kind: "profile",
    answer: "I'm not sure what you're asking for. Try one of these instead:",
    bullets: [
      "Ask about specific projects (Digital Wallet, SmartMarkdown, Refund Engine)",
      "Ask about my technical approach or constraints I've solved",
      "Ask why I'd be a good fit for Innovation Lead roles"
    ],
    sources: [{ title: "Profile", url: "#overview" }],
    followUps: ["What did you build for the digital wallet platform?", "How do you approach production AI systems?"],
  };
};

export async function POST(request: Request) {
  let query = "";
  let queryTokens: string[] = [];
  try {
    const body = (await request.json()) as ChatRequest;
    const messages = body.messages ?? [];
    const mode = body.mode ?? "recruiter";
    const length = body.length ?? "quick";
    const lastUser = [...messages].reverse().find((message) => message.role === "user");
    query = (lastUser?.content ?? "").trim();
    queryTokens = tokenize(query);

    const isProfileIntent = queryTokens.some((token) => PROFILE_INTENT_TOKENS.has(token));
    if (isProfileIntent) {
      return NextResponse.json(getProfileAnswer(query));
    }

    const docs = getPortfolioDocs();
    const retrieved = retrieve(query, docs, 6);
    const contextDocs = retrieved.map((item) => item.doc);
    if (contextDocs.length === 0) {
      return NextResponse.json({
        kind: "missing",
        answer: "I don’t have that in my portfolio yet. Add it to Profile (Years of experience) so I can answer accurately.",
        sources: [],
      } satisfies ChatResponse);
    }

    const hasLlmKey = Boolean(process.env.OPENAI_API_KEY || process.env.PORTFOLIO_LLM_API_KEY);
    if (!hasLlmKey) {
      return NextResponse.json({
        kind: "missing",
        answer: "I can answer detailed case-study questions once an LLM key is configured.",
        bullets: ["Set OPENAI_API_KEY in your deployment environment and redeploy."],
        sources: contextDocs.slice(0, 1).map((doc) => ({ title: doc.title, url: doc.url })),
        followUps: ["Where do you currently work?", "How can I reach you?"],
      } satisfies ChatResponse);
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error("portfolio_chat_timeout")), ROUTE_TIMEOUT_MS);
    });

    let result: Awaited<ReturnType<typeof generateAnswer>>;
    try {
      result = (await Promise.race([
        generateAnswer({ messages, contextDocs, mode, length }),
        timeoutPromise,
      ])) as Awaited<ReturnType<typeof generateAnswer>>;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }

    return NextResponse.json({
      kind: "answer",
      answer: result.answer,
      bullets: result.bullets,
      followUps: result.followUps,
      sources: result.sources.map((source) => ({ title: source.title, url: source.url })),
    } satisfies ChatResponse);
  } catch {
    return NextResponse.json(
      {
        kind: "error",
        answer: "Service unavailable. Retry.",
        sources: [],
      } satisfies ChatResponse,
      { status: 200 }
    );
  }
}
