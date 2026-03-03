// Edit this file to update the portfolio content. Avoid editing JSX for content changes.

export const PORTFOLIO = {
  profile: {
    name: "Nikhil Tanappagol",
    location: "Fremont, California, USA",
    yearsExperience: "9+ years",
    currentCompany: "Albertsons Companies",
    currentTitle: "Innovation Lead • Mobile + AI Systems",
    primaryTitle: "Innovation Lead • Mobile + AI Systems",
    secondaryTitle: "Albertsons Companies",
    focusAreas: "ML/AI models + mobile + backend + production systems",
    signature: "Sketch -> System -> Deploy",
    openTo: "Innovation Lead roles",
    links: {
      resume: "/resume.pdf",
      github: "https://github.com/<your-handle>",
      linkedin: "https://www.linkedin.com/in/nikhil-t-569263106",
      email: "mailto:<your-email>",
    },
  },
  hero: {
    headline:
      "I ship production ML models and end-to-end retail systems: pricing optimization, forecasting, payments, and AI agents.",
    subheadline: "Built for reliability, explainability, and real-world operational constraints.",
    chips: [
      { label: "Role", value: "Innovation Lead" },
      { label: "Domain", value: "Enterprise Retail" },
      { label: "Focus", value: "Mobile + AI Systems" },
      { label: "Signature", value: "Sketch -> System -> Deploy" },
    ],
    primaryCTA: "View Case Studies",
    secondaryCTA: "Open Command Palette (⌘K)",
    proofBullets: [
      "Production ML models: pricing optimization, NLP, forecasting, recommenders",
      "MLOps: Feature engineering, evaluation, explainability, and deployment pipelines",
      "Enterprise retail systems: payments, store ops, and device workflows",
      "End-to-end ownership: ML models → mobile apps → backend → production",
    ],
  },
  recruiterSummary: {
    title: "Why hire me",
    bullets: [
      "ML/AI builder: Production models for pricing, forecasting, NLP, and recommenders with MLOps",
      "Full-stack systems: Mobile (iOS), backend (Node.js), and enterprise retail operations",
      "End-to-end ownership: ML model design → feature engineering → deployment → production monitoring",
    ],
  },
  navItems: [
    { id: "hero", label: "Overview" },
    { id: "case-studies", label: "Case Studies" },
    { id: "ai-lab", label: "AI Lab" },
    { id: "contact", label: "Contact" },
  ],
  impact: {
    eyebrow: "Impact Dashboard",
    title: "Enterprise retail impact",
    intro:
      "Innovation lead focused on mobile architecture, store devices, and AI adoption built for operational reliability.",
    metrics: [
      {
        label: "Payments + Store Ops",
        value: "Shipped",
        note: "Checkout, tender flows, and store workflows",
      },
      {
        label: "Devices",
        value: "Shipped",
        note: "iPad + Zebra + scanner reliability",
      },
      {
        label: "Production AI",
        value: "Pilot",
        note: "RAG + voice + operational models",
      },
      {
        label: "Reliability / Observability",
        value: "Shipped",
        note: "Guardrails, diagnostics, and triage hooks",
      },
    ],
    productionReadiness: {
      title: "Production readiness",
      items: [
        { label: "CI/CD", status: "Implemented" },
        { label: "Monitoring", status: "Implemented" },
        { label: "Guardrails", status: "Implemented" },
        { label: "Evaluation", status: "In progress" },
      ],
    },
  },
  caseStudies: {
    eyebrow: "Case Studies",
    title: "Enterprise retail case studies",
    labels: {
      proof: "Proof tiles",
      tags: "Tags",
      featured: "Featured work",
      more: "More work",
      artifacts: "Artifacts",
    },
    proofTiles: [
      {
        label: "Payments + Store Ops",
        value: "Shipped",
        note: "Checkout, tender flows, and store workflows",
      },
      {
        label: "Devices",
        value: "Shipped",
        note: "iPad + Zebra + scanner reliability",
      },
      {
        label: "Production AI",
        value: "Pilot",
        note: "RAG + voice + operational models",
      },
      {
        label: "Reliability / Observability",
        value: "Shipped",
        note: "Guardrails, diagnostics, and triage hooks",
      },
    ],
    featured: [
      {
        id: "digital-wallet",
        title: "Digital Wallet — Multi-Tender Payments Platform (Built from Start)",
        domain: "Payments • Reliability • UX",
        oneLiner:
          "Designed and built a wallet platform supporting multiple payment types across retail checkout flows: EBT, Credit Card, FSA/HSA, Apple Pay, Store Value/Cash equivalents, and QR payments.",
        signals: ["Reliability", "Payments", "UX", "Operations"],
        tags: ["iOS", "Payment Flows", "Error Design"],
        sections: [
          {
            title: "What I owned",
            items: [
              "Built the wallet platform from the ground up and drove integration across payment methods and checkout flows.",
            ],
          },
          {
            title: "Constraints",
            items: [
              "Multiple tenders with different rules and eligibility requirements",
              "Reliability and correctness expectations under checkout pressure",
              "Integration across client + backend + payment services",
              "Compliance and safe rollout requirements",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Standardized tender capability/eligibility signals so flows behave deterministically",
              "Hardened failure states to prevent ambiguous checkout behavior",
              "Structured logging/telemetry so issues can be diagnosed quickly",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "Multi-tender coverage shipped into a unified wallet experience",
              "Improved flow correctness and reduced ambiguity in payment handling",
              "Easier cross-team alignment due to clear contracts and predictable behavior",
            ],
          },
          {
            title: "Artifacts",
            items: [
              "A 1-page “Tender Capability Matrix”",
              "A flow diagram: eligibility → tender selection → payment → fallback",
              "A “failure taxonomy” list (what can fail + how UI responds)",
            ],
          },
        ],
      },
      {
        id: "smart-markdown",
        title: "SmartMarkdown — Store Label Printing (Scanner + Bluetooth Printer + GS1)",
        domain: "Devices • Store Ops • Reliability",
        oneLiner:
          "Built store-ready printing workflows that configure and connect scanner + Bluetooth printer to reliably print labels and GS1 barcodes in constrained store environments.",
        signals: ["Devices", "Reliability", "UX", "Ownership"],
        tags: ["Zebra", "BLE", "iPad"],
        sections: [
          {
            title: "What I owned",
            items: [
              "End-to-end device workflow: store configuration → pairing → calibration → print success path → recovery flows.",
            ],
          },
          {
            title: "Constraints",
            items: [
              "BLE instability + pairing drift",
              "Stores doing resets / device swaps",
              "Non-technical users under time pressure",
              "Hardware variability (printer/scanner calibration differences)",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Guided configuration + standardized pairing flow (reduce “tribal knowledge”)",
              "Deterministic diagnostics and recovery UX (what to do when it fails)",
              "Store-friendly supportability: clear error states + actionable next step",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "More consistent print success and fewer “mystery failures”",
              "Reduced configuration confusion and improved supportability",
              "A workflow that survives real store constraints (not a lab demo)",
            ],
          },
          {
            title: "Artifacts",
            items: [
              "“Setup checklist” screen or flow (even screenshot blurred)",
              "Printer/Scanner troubleshooting decision tree",
              "Before-print health check steps",
            ],
          },
        ],
      },
      {
        id: "refund-engine",
        title: "Refund Engine — Centralized Policy + Reversal Orchestration",
        domain: "Risk • Compliance • UX",
        oneLiner:
          "Built a centralized refund engine that enforces store policy, extracts accurate refund details for a POC flow, and routes payment reversals to the correct tender reliably.",
        signals: ["Security", "Reliability", "Operations", "Ownership"],
        tags: ["Policy Guardrails", "Audit Trails", "Error Handling"],
        sections: [
          {
            title: "What I owned",
            items: [
              "Central orchestrator design: policy enforcement + refund extraction + payment reversal routing.",
            ],
          },
          {
            title: "Constraints",
            items: [
              "Policy differences and edge cases across stores",
              "High risk of incorrect refund/incorrect tender reversal",
              "Auditability + traceability required",
              "Integrations across multiple systems (POS/POC/payment services)",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Centralized decisioning layer (single source of truth)",
              "Structured extraction of refund signals to avoid mismatches",
              "Explicit reversal routing rules to ensure “right payment, right reversal”",
              "Logging/audit trail designed into the flow",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "More consistent policy-driven outcomes",
              "Reduced ambiguity in refund decisions and easier investigation",
              "Increased correctness of reversal routing across tenders",
            ],
          },
          {
            title: "Artifacts",
            items: [
              "Refund decision flowchart",
              "“Refund signal schema” (inputs → decision → outputs)",
              "Audit log example (redacted)",
            ],
          },
        ],
      },
      {
        id: "markdown-pricing",
        title: "Markdown Optimization Model — Price + Markdown % Recommendations",
        domain: "ML • Pricing • Explainability",
        oneLiner:
          "Built a model that returns recommended price and markdown % to reduce loss from “standard markdown” approaches and improve revenue outcomes across stores.",
        signals: ["ML", "Explainability", "Operations", "Quality"],
        tags: ["Forecasting", "Feature Engineering", "Model Governance"],
        sections: [
          {
            title: "What I owned",
            items: [
              "Model outputs + integration concept: price + markdown %, plus guardrails for safe recommendations.",
            ],
          },
          {
            title: "Constraints",
            items: [
              "Store-to-store variation and noisy retail behavior",
              "Business rules (avoid extreme markdowns)",
              "Trust requirements: explainability matters",
              "Needs to fit into existing workflows (not replace humans)",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Return structured outputs: recommended price + markdown %",
              "Guardrails: min/max bounds + policy constraints + human override",
              "Explainability hooks: reason codes / feature drivers",
              "Evaluation plan: offline backtests + regression checks before rollout",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "More consistent recommendations than fixed standard markdown %",
              "Better decision support for store operations teams",
              "Stronger trust due to explainability + safe constraints",
            ],
          },
          {
            title: "Artifacts",
            items: [
              "Example recommendation card (input summary → output → explanation)",
              "“Rules + model” guardrail list",
              "Offline evaluation outline (what you measure)",
            ],
          },
        ],
      },
    ],
    more: [
      {
        id: "vendor-checkin",
        title: "In-Store Vendor Check-In (PWA) under Device Constraints",
        domain: "PWA • Backend • Data Integrity",
        oneLiner:
          "Built a low-friction vendor check-in/out workflow optimized for locked-down devices and auditability.",
        signals: ["Systems", "Security", "Scale", "Operations"],
        tags: ["React/PWA", "Node APIs", "Data Modeling"],
        sections: [
          {
            title: "Constraints",
            items: [
              "No traditional logins; device cache may reset",
              "Restricted NFC/Bluetooth/geofencing on vendor devices",
              "Need trustworthy check-in/out records",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Designed token strategy + fallbacks for device resets",
              "Separated vendor-facing flow from store-facing visibility app",
              "Added integrity checks and operational guardrails",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "More consistent vendor attendance records",
              "Clear store-side visibility and audit trail",
              "Scalable path for future enhancements (geofencing later)",
            ],
          },
          {
            title: "System context",
            items: [
              "PWA workflow on locked-down devices",
              "Backend integrity checks",
              "Operational audit trail",
            ],
          },
        ],
      },
      {
        id: "devices-zebra",
        title: "Store Device Integrations (Zebra Printers + Scanners)",
        domain: "Devices • UX • Supportability",
        oneLiner:
          "Improved pairing + print reliability by designing predictable setup flows and diagnostics for store devices.",
        signals: ["Reliability", "UX", "Operations", "Ownership"],
        tags: ["BLE", "ZPL", "Diagnostics"],
        sections: [
          {
            title: "Constraints",
            items: [
              "Bluetooth pairing complexity on iPad environments",
              "Label size/calibration inconsistencies",
              "Need supportable workflows for non-technical users",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Standardized setup steps and recoveries (discoverability, reset, calibration)",
              "Made failure states actionable with guided UI messages",
              "Focused on repeatability and operational support",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "Higher print success consistency (operationally)",
              "Reduced confusion during setup/troubleshooting",
              "Clearer documentation and faster issue isolation",
            ],
          },
          {
            title: "System context",
            items: [
              "BLE pairing and diagnostics",
              "Device calibration workflows",
              "Supportability for store teams",
            ],
          },
        ],
      },
      {
        id: "ai-workflow",
        title: "AI-Assisted Engineering: Doc -> API -> Code",
        domain: "LLMs • Automation • Quality",
        oneLiner:
          "Standardized a repeatable workflow to convert requirements into APIs and implementation steps with guardrails.",
        signals: ["Velocity", "Quality", "Leadership", "Platform"],
        tags: ["Prompt Engineering", "Templates", "Guardrails"],
        sections: [
          {
            title: "Constraints",
            items: [
              "Avoid AI-generated chaos; needed consistency and reviewability",
              "Multiple teams consuming specs",
              "High bar for correctness and traceability",
            ],
          },
          {
            title: "Decisions",
            items: [
              "Created prompt templates + structured outputs",
              "Defined validation loop (tests, review checklists, regression prompts)",
              "Emphasized production readiness (logging, edge cases, error design)",
            ],
          },
          {
            title: "Outcomes",
            items: [
              "Faster iteration from requirements to working code",
              "Clearer contracts and shared understanding across teams",
              "Reusable templates for future projects",
            ],
          },
          {
            title: "System context",
            items: [
              "Prompt templates + validation loops",
              "Quality gates for production readiness",
              "Shared tooling across teams",
            ],
          },
        ],
      },
      {
        id: "capstone-youtube",
        title: "Sentiment Intelligence Pipeline (NLP + MLOps)",
        domain: "NLP • MLOps",
        oneLiner:
          "Built an end-to-end NLP pipeline with reproducible training, registry, and deployable artifacts.",
        signals: ["NLP", "MLOps", "Pipelines"],
        tags: ["NLP", "LightGBM", "MLOps"],
        sections: [
          {
            title: "What I implemented",
            items: [
              "Baseline model and iterative improvements (LightGBM)",
              "DVC pipeline workflow",
              "Model registry",
              "Model testing + CI",
              "Docker + CD",
              "Deployment on AWS",
            ],
          },
          {
            title: "Modeling work",
            items: ["Preprocessing + EDA", "Baseline model", "LightGBM improvements"],
          },
          {
            title: "Deployment pipeline",
            items: ["DVC pipeline", "Model registry", "CI/CD to AWS"],
          },
        ],
      },
      {
        id: "capstone-swiggy",
        title: "Delivery Time Prediction (Regression + Feature Engineering)",
        domain: "Forecasting • MLOps",
        oneLiner:
          "Regression pipeline with feature engineering, testing, and packaging for deployment workflows.",
        signals: ["Forecasting", "Testing", "MLOps"],
        tags: ["Forecasting", "Model Testing", "CI"],
        sections: [
          {
            title: "What I implemented",
            items: [
              "Baseline model and experimentation",
              "DVC pipeline workflow",
              "Model registry and API build",
              "Model testing + CI",
              "Docker + CD",
              "Deployment workflow",
            ],
          },
          {
            title: "Modeling work",
            items: ["Feature engineering", "Baseline vs improved models"],
          },
          {
            title: "Deployment pipeline",
            items: ["API packaging", "Testing + CI", "Deployment workflow"],
          },
        ],
      },
      {
        id: "capstone-recommender",
        title: "Hybrid Recommender System (Ranking + Retrieval)",
        domain: "Recommenders • ML",
        oneLiner:
          "Hybrid ranking workflow combining retrieval signals with offline evaluation and iteration.",
        signals: ["Recommenders", "Evaluation", "Modeling"],
        tags: ["Recommenders", "Ranking", "Evaluation"],
        sections: [
          {
            title: "What I implemented",
            items: ["Hybrid recommender design", "Evaluation workflow", "Model iteration"],
          },
          {
            title: "Modeling work",
            items: ["Feature engineering", "Ranking metrics", "Offline evaluation"],
          },
          {
            title: "Deployment pipeline",
            items: ["Packaging for serving", "Testing + validation"],
          },
        ],
      },
      {
        id: "capstone-uber",
        title: "Demand Forecasting Pipeline (Time Series / Forecasting)",
        domain: "Forecasting • ML",
        oneLiner:
          "Time-series forecasting pipeline focused on reproducibility, validation, and packaging.",
        signals: ["Forecasting", "Validation", "Modeling"],
        tags: ["Forecasting", "Time Series", "Validation"],
        sections: [
          {
            title: "What I implemented",
            items: ["Baseline model", "Improved models", "Evaluation workflow"],
          },
          {
            title: "Modeling work",
            items: ["Feature engineering", "Model selection", "Error analysis"],
          },
          {
            title: "Deployment pipeline",
            items: ["Packaging for inference", "Testing and validation"],
          },
        ],
      },
    ],
  },
  systemMap: {
    eyebrow: "System Map",
    title: "System Map (end-to-end ownership)",
    intro: "Mobile, backend, device, and AI workflows designed for enterprise retail operations.",
    labels: {
      stack: "Stack",
      proof: "Proof",
    },
    nodes: [
      {
        id: "mobile",
        label: "Mobile Apps",
        summary: "SwiftUI-first UX, performance, observability hooks, safe failure states.",
        stack: ["Swift", "SwiftUI", "Clean Architecture", "Analytics/Logging"],
        proof: ["Payments flow correctness", "Operational UX for store tools"],
      },
      {
        id: "pwa",
        label: "PWA / Kiosk Flows",
        summary: "Fast, low-friction workflows built for constrained devices and real-world usage.",
        stack: ["React", "TypeScript", "Offline-ish UX", "Token strategies"],
        proof: ["Vendor check-in/out", "Store-facing dashboards"],
      },
      {
        id: "backend",
        label: "API + Orchestration",
        summary: "Contracts, validation, edge cases, scalability, and consistent error design.",
        stack: ["Node/Express", "REST", "AuthN/AuthZ patterns", "Rate limiting (later)"],
        proof: ["Context-driven APIs", "Operational reliability"],
      },
      {
        id: "data",
        label: "Data + Pipelines",
        summary: "Models and pipelines that support auditability and analytics without fragility.",
        stack: ["SQL/NoSQL", "Eventing concepts", "Caching patterns"],
        proof: ["Integrity checks", "Traceable records"],
      },
      {
        id: "ai",
        label: "AI Agents (RAG + Voice)",
        summary: "Productized AI: citations, eval, guardrails, and user trust as first-class features.",
        stack: ["RAG", "Prompting", "Tool routing", "Eval loops"],
        proof: ["Internal assistants", "Voice-first prototypes"],
      },
      {
        id: "obs",
        label: "Observability",
        summary: "Make issues diagnosable fast: logs, metrics, alerts, and clear error paths.",
        stack: ["Tracing mindset", "Dashboards", "Runbooks"],
        proof: ["Faster triage", "Reduced ambiguity in failures"],
      },
      {
        id: "security",
        label: "Security + Risk",
        summary: "Design for safety, privacy, and least privilege—especially around AI + payments.",
        stack: ["Threat modeling", "Token strategies", "Safe logging"],
        proof: ["Guardrails", "Operational trust"],
      },
    ],
  },
  aiLab: {
    eyebrow: "AI Lab",
    title: "AI models and agent demos",
    intro: "Operational AI: models for store workflows plus agent experiences with guardrails.",
    mobileTabs: {
      chat: "Chat",
      proof: "Proof",
    },
    labels: {
      goal: "Goal",
      prompts: "Starter prompts",
      modelCard: "Model Card",
      latency: "Latency Target",
      guardrails: "Guardrails",
      evaluation: "Evaluation",
    },
    proofRail: {
      title: "Proof",
      contactTitle: "Contact",
      publicDemosTitle: "Public demos",
      quickPromptsTitle: "Quick prompts",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      openDemoLabel: "Open demo",
      watchLabel: "Watch",
      readLabel: "Read",
      emailLabel: "Email",
      phoneLabel: "Phone",
      linkedinLabel: "LinkedIn",
    },
    models: {
      title: "AI Models",
      intro: "Product components focused on operational workflows and guardrails.",
      sections: [
        { key: "problem", label: "Problem" },
        { key: "inputs", label: "Inputs" },
        { key: "output", label: "Output" },
        { key: "approach", label: "Approach" },
        { key: "evaluation", label: "Evaluation" },
        { key: "guardrails", label: "Guardrails" },
        { key: "deployment", label: "Deployment" },
      ],
      items: [
        {
          id: "markdown-optimization",
          title: "Markdown Optimization Model",
          status: "Pilot",
          summary: "Recommendation engine for price + markdown % with explainability.",
          problem: "Reduce loss from standard markdowns while preserving business rules.",
          inputs: "Pricing history, sell-through signals, inventory, seasonality.",
          output: "Recommended price + markdown % + explanation.",
          approach: "Feature pipeline + supervised model with rule-based overrides.",
          evaluation: "Backtest + regression tests before rollout.",
          guardrails: "Bounds + human override.",
          deployment: "Pilot workflow with controlled rollout.",
        },
        {
          id: "refund-risk",
          title: "Refund Engine Risk/Correctness Signals",
          status: "Prototype / Planning",
          summary: "AI-assisted logic to support refund policy decisions and routing.",
          problem: "Surface risk and correctness signals for refund routing decisions.",
          inputs: "Refund context, policy rules, tender metadata.",
          output: "Policy decision + reversal routing confidence + trace log.",
          approach: "Rules + AI-assisted signals with explainability.",
          evaluation: "Scenario replay.",
          guardrails: "Safe failure + audit-first.",
          deployment: "Prototype in controlled environments.",
        },
        {
          id: "device-reliability",
          title: "Device Reliability Assistant (Printer/Scanner)",
          status: "Shipped / Pilot",
          summary: "Diagnostic assistant to prevent printing disruptions.",
          problem: "Identify probable failure modes before workflows break.",
          inputs: "Device telemetry, pairing events, error logs.",
          output: "Probable failure class + recovery steps.",
          approach: "Deterministic checks first + assisted logic.",
          evaluation: "Log replay + QA scenarios.",
          guardrails: "Deterministic checks first.",
          deployment: "Shipped with diagnostics and observability hooks.",
        },
      ],
    },
    demos: [
      {
        id: "rag",
        title: "Portfolio RAG Agent",
        subtitle: "Answers with sources from my case studies (citations + confidence)",
        tags: ["RAG", "Citations", "Eval", "Latency"],
        modelCard: {
          goal: "Truthful answers grounded in my own portfolio content.",
          guardrails: ["Citations required", "Fallback when low confidence", "Prompt injection checks (later)"],
          evaluation: ["Golden Q&A set", "Regression tests on prompts", "Chunk recall sanity checks"],
          latencyTarget: "Low-latency target validated during testing",
        },
        starterPrompts: [
          "Explain a time you improved reliability under real constraints",
          "Show your best system design decision and tradeoffs",
          "How do you prevent hallucinations in RAG?",
        ],
      },
      {
        id: "voice",
        title: "Voice Agent",
        subtitle: "Push-to-talk -> tools -> response (pipeline visibility)",
        tags: ["STT", "Tooling", "TTS", "UX"],
        modelCard: {
          goal: "Voice-first UX that feels instant, trustworthy, and explainable.",
          guardrails: ["Explicit tool-call display", "Confirm destructive actions", "Privacy-first logging"],
          evaluation: ["Intent accuracy tests", "Latency across devices", "Fallback prompts when noisy"],
          latencyTarget: "Low-latency target validated during testing",
        },
        starterPrompts: [
          "Summarize my top 3 projects for a hiring manager",
          "What roles am I best suited for and why?",
          "Explain my architecture style in 60 seconds",
        ],
      },
      {
        id: "doc",
        title: "Document Intelligence",
        subtitle: "Summaries + entities + action items (safe demo docs only)",
        tags: ["Extraction", "Structure", "Safety", "Automation"],
        modelCard: {
          goal: "Turn unstructured docs into structured insights for faster execution.",
          guardrails: ["PII redaction option", "No storage mode", "Rate limits (later)"],
          evaluation: ["Field extraction accuracy", "Action item completeness", "Hallucination checks"],
          latencyTarget: "Latency target validated during testing",
        },
        starterPrompts: [
          "Extract risks, owners, dates, and next steps",
          "Generate a runbook checklist from this doc",
          "Create an API contract summary from requirements",
        ],
      },
    ],
  },
  qaAgent: {
    title: "Ask About My Work",
    description: "Get detailed answers about my projects, technical approach, and experience. Powered by AI, grounded in real work.",
    openModalLabel: "Ask Questions",
    modalHelper: "AI assistant trained on my portfolio. Ask about projects, technical decisions, or why I'd be a good fit.",
    modalTabs: {
      chat: "Chat",
      proof: "Proof",
      contact: "Contact",
    },
    closeModalLabel: "Close chat",
    settingsLabel: "Settings",
    settingsModeLabel: "Mode",
    settingsDepthLabel: "Depth",
    inputPlaceholder: "Ask about projects, technical decisions, or interview topics...",
    sendLabel: "Send",
    loadingLabel: "Analyzing portfolio...",
    sourcesLabel: "Proof",
    userLabel: "You",
    copyLabel: "Copy",
    openSourcesLabel: "Open sources",
    expandDeepLabel: "Expand (Deep)",
    modes: [
      { id: "recruiter", label: "Recruiter" },
      { id: "engineering", label: "Engineering" },
      { id: "executive", label: "Executive" },
    ],
    lengths: [
      { id: "quick", label: "Quick" },
      { id: "deep", label: "Deep" },
    ],
    followUpFallback: [
      "Want a deeper engineering breakdown for one flagship project?",
      "Want a concise recruiter summary for this answer?",
    ],
    quickChips: [
      {
        label: "Profile Overview",
        question: "Give me a 30-second overview of your experience and what makes you interview-worthy",
      },
      {
        label: "Digital Wallet",
        question: "What did you build for the digital wallet platform?",
      },
      {
        label: "SmartMarkdown",
        question: "How did you improve SmartMarkdown store printing reliability?",
      },
      {
        label: "Production AI",
        question: "How do you approach production AI systems with guardrails and evaluation?",
      },
      {
        label: "Contact Me",
        question: "How can I reach you?",
      },
    ],
    starterPrompts: [
      "What did you build for the digital wallet platform?",
      "How did you improve SmartMarkdown store printing reliability?",
      "How can I reach you?",
    ],
  },
  sketchToSystem: {
    eyebrow: "Sketch -> System",
    title: "Sketches that became production workflows",
    intro: "Concepts translated into real store operations.",
    labels: {
      sketch: "Sketch",
      system: "System",
      production: "Production hardening",
    },
    items: [
      {
        id: "sketch-smartmarkdown",
        title: "Sketch -> System: SmartMarkdown Store Printing Reliability",
        description: "Store-ready printing with scanner + Bluetooth printer + GS1.",
        tags: ["DEVICES", "RELIABILITY", "UX"],
        sections: {
          sketch: [
            "Unreliable store printing + confusion when Bluetooth breaks",
            "Manual troubleshooting slowed store operations",
          ],
          system: [
            "Connection manager + health checks + recovery UX + device constraints handling",
            "Scanner + printer integration for GS1 label output",
          ],
          production: [
            "Deterministic checks first",
            "Targeted errors",
            "Telemetry hooks",
            "Safe fallback steps",
          ],
        },
        artifacts: [
          { label: "Artifact: flow sketch (add later)", image: "" },
          { label: "Artifact: system diagram (add later)", image: "" },
          { label: "Artifact: UI screenshot (add later)", image: "" },
        ],
      },
      {
        id: "sketch-wallet",
        title: "Sketch -> System: Digital Wallet Payments Platform",
        description: "Multi-tender wallet flow with deterministic eligibility and safe fallbacks.",
        tags: ["PAYMENTS", "RELIABILITY", "DELIVERY"],
        sections: {
          sketch: [
            "Inconsistent eligibility signals across client/backend/payment services",
            "Edge cases created ambiguous failure states",
          ],
          system: [
            "Explicit context signals + deterministic eligibility",
            "Flow contracts across client and backend",
          ],
          production: [
            "Edge-case handling",
            "Rollout-safe gating",
            "Monitoring for regression",
          ],
        },
        artifacts: [
          { label: "Artifact: flow sketch (add later)", image: "" },
          { label: "Artifact: tender capability matrix (add later)", image: "" },
          { label: "Artifact: failure taxonomy (add later)", image: "" },
        ],
      },
      {
        id: "sketch-refund",
        title: "Sketch -> System: Refund Engine Orchestrator",
        description: "Centralized policy + reversal routing with auditability.",
        tags: ["RISK", "AUDITABILITY", "SAFETY"],
        sections: {
          sketch: [
            "High-risk edge cases needed safe decisioning + auditability",
            "Manual review lacked consistent guardrails",
          ],
          system: [
            "Rule/guardrail layer + clear outcomes + traceability",
            "Decision logging for audit readiness",
          ],
          production: [
            "Safe failures",
            "Logging",
            "Validation gates",
            "Supportability",
          ],
        },
        artifacts: [
          { label: "Artifact: refund decision flow (add later)", image: "" },
          { label: "Artifact: refund signal schema (add later)", image: "" },
          { label: "Artifact: audit log example (add later)", image: "" },
        ],
      },
      {
        id: "sketch-markdown-ml",
        title: "Sketch -> System: Markdown Optimization Model",
        description: "Price + markdown % recommendations with explainability.",
        tags: ["ML", "RETAIL", "EXPLAINABILITY"],
        sections: {
          sketch: [
            "Manual markdown decisions lacking consistency",
            "Low trust in recommendations without explainability",
          ],
          system: [
            "Feature pipeline + prediction/recommendation",
            "Explainability outputs",
          ],
          production: [
            "Thresholds",
            "Human override",
            "Offline eval + monitoring plan",
          ],
        },
        artifacts: [
          { label: "Artifact: recommendation card (add later)", image: "" },
          { label: "Artifact: rules + model guardrails (add later)", image: "" },
          { label: "Artifact: offline eval outline (add later)", image: "" },
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    description:
      "Open to innovation leadership roles focused on mobile platforms, retail systems, and AI adoption.",
    email: "nikhiltanappagol.nt@gmail.com",
    phone: "+1-361-228-2790",
    linkedin: "https://www.linkedin.com/in/nikhil-t-569263106",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-t-569263106" },
      { label: "GitHub", href: "https://github.com/<your-handle>" },
      { label: "Email", href: "mailto:<your-email>" },
    ],
  },
  publicLinks: [
    {
      type: "Gemini App",
      title: "Gemini hosted app",
      url: "https://aistudio.google.com/apps/drive/1vzP7iZEGfmtYsX4tqgPu3iiyrtMT_kPt?fullscreenApplet=true&showPreview=true&showAssistant=true",
    },
    {
      type: "YouTube",
      title: "Digicare Smart Mirror: Daily Check-ins – Triage and SOAP with medGemma 1.5",
      url: "https://youtu.be/6Cn4cRhg_vA",
    },
    {
      type: "YouTube",
      title: "DigiCare – LifeTwin",
      url: "https://youtu.be/7OpZAJiLLKM",
    },
    {
      type: "Substack",
      title: "How I Use Claude CCL in Real Projects (And When I Don’t)",
      url: "https://substack.com/@nikhiltanappagol/note/p-186678075?r=2xzdhr&utm_medium=ios&utm_source=notes-share-action",
    },
    {
      type: "Substack",
      title: "Using Cursor AI Like a Pro: Custom Prompts, Agent Rules, and Guardrails",
      url: "https://substack.com/@nikhiltanappagol/note/p-186677092?r=2xzdhr&utm_medium=ios&utm_source=notes-share-action",
    },
  ],
  highlights: [
    {
      title: "Hackathon: 1st place (Voice-first AI)",
      description:
        "Built “The Daily Reflection”, a voice-first health reflection experience in a 15-hour sprint. Won 1st place; focus on production-grade agent UX and clarity.",
    },
  ],
  commandPalette: {
    title: "Command Palette",
    description: "Jump to sections or run quick actions.",
    hint: "⌘K",
    summary: [
      "Enterprise retail systems across mobile, backend, devices, and AI.",
      "Open to Innovation Lead roles",
    ],
    closeLabel: "Close",
    actions: [
      { id: "jump-overview", label: "Go to Overview", section: "#hero", detail: "#hero" },
      { id: "jump-cases", label: "Go to Case Studies", section: "#case-studies", detail: "#case-studies" },
      { id: "jump-ai", label: "Go to AI Lab", section: "#ai-lab", detail: "#ai-lab" },
      { id: "jump-contact", label: "Go to Contact", section: "#contact", detail: "#contact" },
      { id: "download-resume", label: "Download Resume", href: "/resume.pdf", detail: "/resume.pdf" },
      { id: "copy-summary", label: "Copy Recruiter Summary", action: "COPY_RECRUITER_SUMMARY", detail: "Copy summary" },
    ],
  },
  dock: {
    actions: [
      { id: "chat", label: "Chat", hint: "Open chat" },
      { id: "voice", label: "Voice", hint: "Open voice" },
      { id: "search", label: "Search", hint: "RAG search" },
    ],
  },
  agent: {
    title: "Portfolio Agent",
    description: "Ask about impact, systems, or AI work.",
    tabs: {
      chat: "Chat",
      voice: "Voice",
    },
    chat: {
      seedMessages: [
        {
          role: "assistant",
          content: "Ask about payments, device workflows, or AI systems.",
        },
      ],
      mockReply:
        "I build mobile + in-store systems with AI guardrails, focusing on reliability, device constraints, and operational UX.",
      sources: ["Case Studies", "System Map", "AI Lab"],
      confidence: "High",
      sourcesLabel: "Sources",
      confidenceLabel: "Confidence",
      inputPlaceholder: "Ask about payments, devices, or AI...",
      sendLabel: "Send",
    },
    voice: {
      pushToTalkLabel: "Push to talk",
      helperText: "Pipeline visibility: STT → LLM → Tools → TTS",
      transcriptLabel: "Transcript",
      transcript: "Summarize the mobile + AI systems you’ve shipped.",
      pipelineLabel: "Pipeline",
      pipeline: ["STT", "LLM", "Tools", "TTS"],
    },
  },
  uiLabels: {
    toggleTheme: "Toggle theme",
  },
} as const;

export type Portfolio = typeof PORTFOLIO;

export const DOCK = PORTFOLIO.dock;
export const AGENT = PORTFOLIO.agent;

export type AgentMessage = {
  role: "user" | "assistant";
  content: string;
};

export type RagPreview = {
  type: "rag";
  queryLabel: string;
  query: string;
  answerLabel: string;
  answer: string;
  confidenceLabel: string;
  confidence: number;
  snippetsLabel: string;
  snippets: { title: string; score: string; snippet: string }[];
};

export type VoicePreview = {
  type: "voice";
  transcriptLabel: string;
  transcript: string;
  replyLabel: string;
  reply: string;
  pipelineLabel: string;
  pipeline: string[];
};

export type DocPreview = {
  type: "doc";
  dropLabel: string;
  summaryLabel: string;
  summary: string;
  entitiesLabel: string;
  entities: { label: string; value: string }[];
  checklistLabel: string;
  checklist: { label: string; status: string }[];
};

export type AiLabDemo = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  detail: string;
  preview: RagPreview | VoicePreview | DocPreview;
};

export type ReadinessMetric = {
  label: string;
  value: number;
  note: string;
};

export type CaseStudy = {
  title: string;
  impact: string;
  constraints: string[];
  decisions: string[];
  metrics: string[];
  tags: string[];
};

export type ContactField = {
  label: string;
  type: string;
  placeholder: string;
};

export type SketchItem = {
  title: string;
  caption: string;
  image?: string;
};

export type SketchStory = {
  title: string;
  steps: string[];
};
