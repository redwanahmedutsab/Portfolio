// All content lives here. Edit this file to update the site; no JSX changes needed.
export const profile = {
  name: "Redwan Ahmed Utsab",
  role: "AI Engineer",
  tagline: "LLM Applications, RAG & Agentic Systems",
  typed: ["agentic RAG pipelines", "fine-tuned transformer models", "LLM-powered products", "production-ready AI backends"],
  summary:
    "I build and ship LLM-powered systems end to end: agentic RAG pipelines on LangGraph and LangChain, fine-tuned transformer models, and the FastAPI and Django backends and Docker deployments that put them in production.",
  email: "redwanutsab@gmail.com",
  phone: "+8801789160352",
  location: "Dhaka, Bangladesh",
  links: [
    { label: "GitHub", href: "https://github.com/redwanahmedutsab" },
    { label: "LinkedIn", href: "https://linkedin.com/in/redwanahmedutsab" },
    { label: "LeetCode", href: "https://leetcode.com/u/redwanahmedutsab/" },
  ],
};

export const stats = [
  { to: 450, suffix: "+", label: "LeetCode solved" },
  { to: 94, suffix: "%", label: "intent accuracy" },
  { to: 3, suffix: "", label: "live products" },
  { to: 2, suffix: "", label: "papers under review" },
];

export const about = [
  "I'm an AI Engineer based in Dhaka who likes taking an idea from a notebook all the way to a deployed product. I have built a live agentic AI platform (CareerMind), a full-stack campus services platform (Campusor), and an ML inference service inside a real estate SaaS product (Proprietor).",
  "On the research side, I co-authored two papers on NLP and Transformer efficiency, both under review. I'm also the founder of BinaryBrains Technologies, where I own product, engineering and client delivery.",
];

export const facts = [
  ["Location", "Dhaka, Bangladesh"],
  ["Education", "B.Sc. CSE (Data Science), United International University"],
  ["CGPA", "3.69 / 4.00"],
  ["Languages", "Bengali (native), English (IELTS 6.5)"],
  ["Currently", "Co-Founder & Co-CEO, BinaryBrains Technologies"],
];

export const skills = [
  { group: "AI & LLM Engineering", icon: "spark", items: ["LLM Application Development", "RAG", "Agentic & Multi-Agent Systems", "LangChain", "LangGraph", "Prompt Engineering", "Embeddings", "Semantic Search", "SSE Streaming"] },
  { group: "ML & NLP", icon: "brain", items: ["Transformers", "BERT / DistilBERT Fine-Tuning", "Intent Classification", "NER", "Scikit-Learn", "ONNX Export & Inference", "Model Evaluation"] },
  { group: "Vector Stores & LLM APIs", icon: "db", items: ["ChromaDB", "Qdrant", "Groq (LLaMA)", "Gemini API", "sentence-transformers"] },
  { group: "Backend & APIs", icon: "server", items: ["Python", "FastAPI", "Django", "Django REST Framework", "REST API Design", "JWT", "WebSocket", "Celery", "Redis"] },
  { group: "Databases", icon: "table", items: ["PostgreSQL", "MySQL", "Redis", "Schema Design", "Composite Indexing", "Query Optimization"] },
  { group: "MLOps & Deployment", icon: "rocket", items: ["Docker", "GitHub Actions CI/CD", "AWS EC2", "Nginx", "Render", "Vercel", "Linux", "Git", "pytest"] },
  { group: "Frontend & Fundamentals", icon: "code", items: ["React.js", "Next.js", "Java", "JavaScript", "SQL", "Data Structures & Algorithms", "System Design"] },
];

export const marquee = ["LangGraph", "LangChain", "RAG", "FastAPI", "Django REST", "ChromaDB", "Qdrant", "Groq", "Gemini API", "BERT", "Scikit-Learn", "ONNX", "PostgreSQL", "Redis", "Docker", "GitHub Actions", "AWS EC2", "React", "Next.js"];

export const timeline = [
  {
    kind: "work",
    role: "Co-Founder & Co-CEO",
    org: "BinaryBrains Technologies",
    when: "Present",
    where: "Dhaka, Bangladesh",
    points: [
      "Founded a full-service IT and AI company delivering web, backend and AI-powered solutions; own product, engineering, branding and client-facing delivery end to end.",
      "Built and deployed the company website in React on Vercel with a custom domain, and integrated a Gemini-powered chatbot for visitor queries.",
    ],
  },
  {
    kind: "work",
    role: "Undergraduate Teaching Assistant",
    org: "United International University",
    when: "Feb 2025 – Mar 2026",
    where: "Dhaka, Bangladesh",
    points: [
      "Taught data structures, algorithms (trees, graphs, DP) and OOP to 200+ students per semester; designed exercise sets adopted across 3 sections.",
      "Reduced average student debugging time by 40% through targeted code reviews; graded 500+ submissions per semester with under 48-hour turnaround; rated 4.8/5.0 in student evaluations.",
    ],
  },
  {
    kind: "edu",
    role: "B.Sc. in Computer Science and Engineering (Data Science)",
    org: "United International University",
    when: "Graduated Mar 2026",
    where: "Dhaka",
    points: [
      "CGPA 3.69 / 4.00.",
      "Coursework: Machine Learning, Natural Language Processing, Data Structures & Algorithms, Database Systems, Software Engineering, Operating Systems, Discrete Mathematics.",
    ],
  },
];

export const projects = [
  {
    title: "CareerMind",
    kind: "Agentic RAG Career Intelligence Platform",
    art: "career",
    metrics: [["LangGraph", "multi-step agent"], ["RAG", "grounded answers"]],
    stack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "Scikit-Learn", "Groq", "Docker", "Render", "Vercel"],
    links: [
      { label: "Live", href: "https://career-mind-app.vercel.app/login" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/careermind" },
    ],
    points: [
      "Built a multi-step agentic RAG system on LangGraph that retrieves career and job knowledge from ChromaDB and generates grounded, personalized guidance with Groq-hosted LLMs.",
      "Added a Scikit-Learn fit-scoring model to rank candidate–role alignment, combining classical ML with LLM reasoning in one FastAPI service.",
      "Shipped as a Dockerized backend on Render with a Vercel frontend and authenticated user flow.",
    ],
  },
  {
    title: "Proprietor",
    kind: "Real Estate SaaS with ML Price Prediction",
    art: "property",
    metrics: [["<200ms", "ML inference"], ["−60%", "query latency"], ["100%", "branch coverage"]],
    stack: ["Python", "FastAPI", "Django REST", "Scikit-Learn", "PostgreSQL", "React.js", "Docker", "GitHub Actions"],
    links: [
      { label: "Live", href: "https://proprietor.binarybrains.tech" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/Proprietor" },
    ],
    points: [
      "Built and integrated an ML inference microservice (Scikit-Learn regression served via FastAPI) for property price prediction at under 200ms response time.",
      "Designed 25+ REST endpoints with JWT/RBAC and 8 PostgreSQL entities with composite indexes, cutting listing query latency by 60%.",
      "Verified the SSLCommerz payment lifecycle with integration tests (100% branch coverage); deployed via Docker and GitHub Actions CI/CD on Vercel, Render and Neon PostgreSQL.",
    ],
  },
  {
    title: "Campusor",
    kind: "Campus Services Platform",
    art: "campus",
    metrics: [["4", "bounded apps"], ["−70%", "response payload"]],
    stack: ["Python", "Django REST", "WebSocket", "React.js", "Next.js", "PostgreSQL", "Docker", "GitHub Actions"],
    links: [
      { label: "Live", href: "https://campusor.vercel.app" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/Campusor" },
    ],
    points: [
      "Architected four bounded Django apps (Users, Marketplace, Events, Lost & Found) following OOP and SOLID principles, enabling parallel development across modules.",
      "Designed a shared JWT auth layer (refresh token rotation, RBAC) serving all 4 modules with zero auth duplication; added API versioning.",
      "Moved filtering server-side with django-filter, cutting average response payload by 70% vs. client-side filtering.",
    ],
  },
];

export const research = [
  {
    title: "Optimized Transformer Architecture for Long Sequences",
    meta: "Manuscript under review · B.Sc. thesis · 2024 – 2025",
    text: "Proposed hierarchical, selective attention constraints that reduce per-layer complexity from O(n²) to O(n log n). Benchmarked across 3 sequence-length configurations with measurable FLOP and memory reductions at comparable accuracy.",
  },
  {
    title: "Natural Language Driven Circuit Design System",
    meta: "Conference paper under review · 2024 – 2025",
    text: "Co-authored a multimodal NLP + Computer Vision pipeline that turns natural language commands into circuit diagrams end to end in under 2 seconds. A fine-tuned BERT-based intent classifier and NER model extract circuit components from free-form text.",
  },
];

export const wins = [
  { title: "1st Place", text: "Database Management System", meta: "Inter-University · 2023" },
  { title: "1st Place", text: "System Analysis & Design", meta: "Inter-University · 2024" },
  { title: "1st Place", text: "Pathao Quiz Championship", meta: "2024" },
  { title: "1st Runner-Up", text: "Thesis Presentation", meta: "Inter-University · 2025" },
];
