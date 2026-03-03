import { PORTFOLIO } from "@/lib/data";

export type Doc = {
  id: string;
  title: string;
  url: string;
  text: string;
  tags?: readonly string[];
};

const join = (parts: (string | undefined)[]) => parts.filter(Boolean).join(" ");

export function getPortfolioDocs(): Doc[] {
  const docs: Doc[] = [];

  docs.push({
    id: "profile-core",
    title: "Current role, company, and location",
    url: "#overview",
    text: join([
      `Name ${PORTFOLIO.profile.name}`,
      `Years of experience ${PORTFOLIO.profile.yearsExperience}`,
      `Current role ${PORTFOLIO.profile.currentTitle}`,
      `Company ${PORTFOLIO.profile.currentCompany}`,
      `Location ${PORTFOLIO.profile.location}`,
      `Focus ${PORTFOLIO.profile.focusAreas}`,
      `Open to ${PORTFOLIO.profile.openTo}`,
      `Email ${PORTFOLIO.contact.email}`,
      `Phone ${PORTFOLIO.contact.phone}`,
      `LinkedIn ${PORTFOLIO.contact.linkedin}`,
    ]),
    tags: ["profile", "current role", "company", "location", PORTFOLIO.profile.secondaryTitle],
  });

  docs.push({
    id: "profile",
    title: "Profile",
    url: "#overview",
    text: join([
      PORTFOLIO.profile.name,
      PORTFOLIO.profile.yearsExperience,
      PORTFOLIO.profile.currentTitle,
      PORTFOLIO.profile.currentCompany,
      PORTFOLIO.profile.primaryTitle,
      PORTFOLIO.profile.secondaryTitle,
      PORTFOLIO.profile.location,
      PORTFOLIO.profile.focusAreas,
      PORTFOLIO.profile.openTo,
      PORTFOLIO.contact.email,
      PORTFOLIO.contact.phone,
      PORTFOLIO.contact.linkedin,
    ]),
    tags: [PORTFOLIO.profile.secondaryTitle, PORTFOLIO.profile.primaryTitle],
  });

  docs.push({
    id: "hero",
    title: "Overview",
    url: "#overview",
    text: join([
      PORTFOLIO.hero.headline,
      PORTFOLIO.hero.subheadline,
      PORTFOLIO.profile.primaryTitle,
      PORTFOLIO.profile.secondaryTitle,
      PORTFOLIO.profile.focusAreas,
    ]),
  });

  docs.push({
    id: "recruiter-summary",
    title: PORTFOLIO.recruiterSummary.title,
    url: "#contact",
    text: PORTFOLIO.recruiterSummary.bullets.join(" "),
  });

  PORTFOLIO.caseStudies.featured.forEach((study) => {
    const sectionText = study.sections
      .map((section) => `${section.title}: ${section.items.join("; ")}`)
      .join(" ");
    docs.push({
      id: `case-${study.id}`,
      title: study.title,
      url: `#case-${study.id}`,
      text: join([study.oneLiner, sectionText, study.domain]),
      tags: [...study.tags, ...(study.signals ?? [])],
    });
  });

  PORTFOLIO.aiLab.models.items.forEach((model) => {
    docs.push({
      id: `ai-model-${model.id}`,
      title: model.title,
      url: `#ai-model-${model.id}`,
      text: join([
        model.summary,
        model.problem,
        model.inputs,
        model.output,
        model.approach,
        model.evaluation,
        model.guardrails,
        model.deployment,
      ]),
      tags: [model.status],
    });
  });

  PORTFOLIO.sketchToSystem.items.forEach((item) => {
    const sketch = item.sections.sketch.join("; ");
    const system = item.sections.system.join("; ");
    const production = item.sections.production.join("; ");
    docs.push({
      id: `sketch-${item.id}`,
      title: item.title,
      url: `#sketch-${item.id}`,
      text: join([item.description, sketch, system, production]),
      tags: item.tags,
    });
  });

  docs.push({
    id: "contact",
    title: PORTFOLIO.contact.title,
    url: "#contact",
    text: join([
      PORTFOLIO.contact.description,
      PORTFOLIO.contact.email,
      PORTFOLIO.contact.phone,
      PORTFOLIO.contact.linkedin,
    ]),
  });

  PORTFOLIO.publicLinks.forEach((link, index) => {
    docs.push({
      id: `public-link-${index + 1}`,
      title: `${link.type}: ${link.title}`,
      url: link.url,
      text: join([link.type, link.title, link.url]),
      tags: [link.type],
    });
  });

  PORTFOLIO.highlights.forEach((highlight, index) => {
    docs.push({
      id: `highlight-${index + 1}`,
      title: highlight.title,
      url: "#hero",
      text: highlight.description,
    });
  });

  return docs;
}
