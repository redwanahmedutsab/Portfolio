// All content lives here. Edit this file to update the site; no JSX changes needed.
export const profile = {
  name: "Redwan Ahmed Utsab",
  role: "AI Engineer",
  headline: "I build LLM systems that make it to production.",
  summary:
    "Agentic RAG pipelines, fine-tuned transformer models, and the FastAPI/Django backends and Docker deployments that put them in front of real users. Co-author of two research papers on NLP and Transformer efficiency (under review).",
  email: "redwanutsab@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/redwanahmedutsab" },
    { label: "LinkedIn", href: "https://linkedin.com/in/redwanahmedutsab" },
    { label: "LeetCode", href: "https://leetcode.com/u/redwanahmedutsab/" },
  ],
};

// The hero diagram: how CareerMind answers a question.
export const pipeline = [
  { step: "Question", note: "User asks about a career path" },
  { step: "Router", note: "LangGraph decides what to do next" },
  { step: "Retrieve", note: "ChromaDB finds grounded context" },
  { step: "Score", note: "Scikit-Learn ranks role fit" },
  { step: "Generate", note: "Groq-hosted LLM writes the answer" },
];

export const projects = [
  {
    title: "CareerMind",
    kind: "Agentic RAG career intelligence platform",
    stack: ["LangGraph", "ChromaDB", "Groq", "FastAPI", "Scikit-Learn", "Docker"],
    links: [{ label: "Live demo", href: "https://career-mind-app.vercel.app/login" }],
    points: [
      "Multi-step agent on LangGraph that retrieves career and job knowledge from ChromaDB and writes grounded, personalized guidance.",
      "Scikit-Learn fit-scoring model ranks candidate and role alignment, combined with LLM reasoning in one FastAPI service.",
      "Dockerized backend on Render, Vercel frontend, authenticated user flow.",
    ],
  },
  {
    title: "Proprietor",
    kind: "Real estate SaaS with ML price prediction",
    stack: ["FastAPI", "Django REST", "Scikit-Learn", "PostgreSQL", "React", "GitHub Actions"],
    links: [
      { label: "Live", href: "https://proprietor.binarybrains.tech" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/Proprietor" },
    ],
    points: [
      "ML inference microservice serving property price predictions in under 200ms.",
      "25+ REST endpoints with JWT/RBAC and 8 PostgreSQL entities; composite indexes cut listing query latency by 60%.",
      "SSLCommerz payment lifecycle verified with integration tests (100% branch coverage); CI/CD on Vercel, Render and Neon.",
    ],
  },
  {
    title: "Campusor",
    kind: "Campus services platform",
    stack: ["Django REST", "WebSocket", "Next.js", "PostgreSQL", "Docker"],
    links: [
      { label: "Live", href: "https://campusor.vercel.app" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/Campusor" },
    ],
    points: [
      "Four bounded Django apps (Users, Marketplace, Events, Lost & Found) built on OOP and SOLID principles.",
      "One shared JWT auth layer with refresh token rotation and RBAC, zero auth duplication across modules.",
      "Server-side filtering with django-filter cut average response payload by 70%.",
    ],
  },
];

export const research = [
  {
    title: "Optimized Transformer Architecture for Long Sequences",
    meta: "B.Sc. thesis, manuscript under review, 2024-2025",
    text: "Hierarchical, selective attention constraints reduce per-layer complexity from O(n²) to O(n log n), benchmarked across 3 sequence-length configurations with lower FLOPs and memory at comparable accuracy.",
  },
  {
    title: "Natural Language Driven Circuit Design System",
    meta: "Conference paper under review, 2024-2025",
    text: "Multimodal NLP and computer vision pipeline that turns natural language commands into circuit diagrams in under 2 seconds. A fine-tuned BERT intent classifier and NER model reached 94% accuracy on a held-out set.",
  },
];

export const experience = [
  {
    role: "Co-Founder & Co-CEO",
    org: "BinaryBrains Technologies",
    when: "Present",
    text: "Full-service IT and AI company delivering web, backend and AI solutions. I own product, engineering, branding and client delivery, and built the company site with a Gemini-powered chatbot.",
  },
  {
    role: "Undergraduate Teaching Assistant",
    org: "United International University",
    when: "Feb 2025 to Mar 2026",
    text: "Taught data structures, algorithms and OOP to 200+ students per semester. Code reviews cut average debugging time by 40%; rated 4.8/5.0 in student evaluations.",
  },
];

export const skills = [
  ["AI & LLM", "RAG, agentic and multi-agent systems, LangChain, LangGraph, prompt engineering, embeddings, semantic search, SSE streaming"],
  ["ML & NLP", "Transformers, BERT / DistilBERT fine-tuning, intent classification, NER, Scikit-Learn, ONNX export"],
  ["Vector stores & LLM APIs", "ChromaDB, Qdrant, Groq (LLaMA), Gemini API, sentence-transformers"],
  ["Backend", "Python, FastAPI, Django REST Framework, JWT, WebSocket, Celery, Redis"],
  ["Data", "PostgreSQL, MySQL, Redis, schema design, composite indexing"],
  ["Deploy", "Docker, GitHub Actions, AWS EC2, Nginx, Render, Vercel, Linux, pytest"],
  ["Frontend", "React, Next.js, JavaScript"],
];

export const wins = [
  "450+ LeetCode problems solved",
  "1st Place, Database Management System, inter-university (2023)",
  "1st Place, System Analysis & Design, inter-university (2024)",
  "1st Place, Pathao Quiz Championship (2024)",
  "1st Runner-Up, Thesis Presentation, inter-university (2025)",
];
