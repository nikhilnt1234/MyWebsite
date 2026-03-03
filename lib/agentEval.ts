import type { Doc } from "@/lib/portfolioDocs";

export const GOLDEN_QA = [
  {
    question: "What did you build for the digital wallet platform?",
    expectedDocs: ["case-digital-wallet"],
  },
  {
    question: "How did you improve store device reliability?",
    expectedDocs: ["case-smart-markdown", "sketch-sketch-smartmarkdown"],
  },
  {
    question: "What is your approach to AI adoption in production?",
    expectedDocs: ["ai-model-markdown-optimization"],
  },
];

export function evaluateAnswer(answer: string, citations: { id: string }[], contextDocs: Doc[]) {
  const citationIds = new Set(citations.map((c) => c.id));
  const hasCitation = citations.length > 0;
  const mentionsOutsideContext = !contextDocs.some((doc) => answer.includes(doc.title));

  return {
    hasCitation,
    mentionsOutsideContext,
    citationIds: Array.from(citationIds),
  };
}
