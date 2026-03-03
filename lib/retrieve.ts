import type { Doc } from "@/lib/portfolioDocs";

export const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
};

const normalizeQuery = (text: string) => {
  const cleaned = text.toLowerCase().trim();
  const replacements: Array<[RegExp, string]> = [
    [/where are (you )?working currently/g, "where do you currently work"],
    [/where are working currently/g, "where do you currently work"],
    [/where you currently work/g, "where do you currently work"],
    [/where r u working currently/g, "where do you currently work"],
    [/where you working now/g, "where do you currently work"],
    [/where do you work now/g, "where do you currently work"],
    [/current(ly)? employer/g, "current company"],
    [/current(ly)? work/g, "current company"],
    [/who do you work for/g, "current company"],
  ];
  return replacements.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), cleaned);
};

export const score = (doc: Doc, queryTokens: string[]): number => {
  if (queryTokens.length === 0) return 0;
  const titleTokens = new Set(tokenize(doc.title));
  const bodyTokens = new Set(tokenize(doc.text));
  const tagTokens = new Set((doc.tags ?? []).flatMap((tag) => tokenize(tag)));

  let total = 0;
  queryTokens.forEach((token) => {
    if (titleTokens.has(token)) total += 4;
    if (tagTokens.has(token)) total += 2;
    if (bodyTokens.has(token)) total += 1;
  });

  return total;
};

export const retrieve = (query: string, docs: Doc[], k = 6) => {
  const normalized = normalizeQuery(query);
  const queryTokens = tokenize(normalized);
  const linkIntentTokens = new Set(["demo", "demos", "link", "links", "youtube", "substack", "gemini", "video", "studio"]);
  const allowPublicLinkDocs = queryTokens.some((token) => linkIntentTokens.has(token));

  const filteredDocs = docs.filter((doc) => {
    const isPublicLinkDoc = doc.id.startsWith("public-link-");
    if (!isPublicLinkDoc) return true;
    return allowPublicLinkDocs;
  });

  const profileBoostTokens = new Set([
    "work",
    "working",
    "currently",
    "company",
    "employer",
    "role",
    "job",
    "title",
    "where",
    "current",
    "currently",
    "company",
    "contact",
    "email",
    "phone",
    "linkedin",
  ]);
  const shouldBoostProfile = queryTokens.some((token) => profileBoostTokens.has(token));

  const ranked = filteredDocs
    .map((doc) => {
      let base = score(doc, queryTokens);
      if (shouldBoostProfile && (doc.id === "profile-core" || doc.id === "profile" || doc.id === "contact")) {
        base += 8;
      }
      return { doc, score: base };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (shouldBoostProfile && !ranked.some((item) => item.doc.id === "profile-core")) {
    const profileCore = filteredDocs.find((doc) => doc.id === "profile-core");
    if (profileCore) ranked.unshift({ doc: profileCore, score: 999 });
  }

  return ranked.slice(0, k);
};
