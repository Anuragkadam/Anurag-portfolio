import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "NxtGen Boss",
    description: "Implemented core features for a full-stack ed-tech platform with parent and child portals, learning modules, quizzes, certificates, and progress tracking, including Stripe subscriptions, multilingual UI (English/Spanish), secure AWS S3 file handling, and dashboards using React, TypeScript, Node.js, and Express.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    category: "Full-Stack Web App",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "AWS S3",
      "Tailwind CSS"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/nxtgen-boss",
    featured: true
  },
  {
    id: 2,
    title: "AlphaGen",
    description: "Built the complete frontend for an AI-powered financial analysis platform using Next.js, Zustand, and Framer Motion, including responsive UI, multi-file upload flows, document parsing workflows, admin dashboards (users, projects, tokens, models), and chat-based AI insights.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    category: "Frontend Web App",
    technologies: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "Framer Motion",
      "Tailwind CSS"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/alphagen",
    featured: true
  },
  {
    id: 3,
    title: "BPA – Buying Power Analytics",
    description: "Multi-portal real-estate eligibility system with Admin, Agent, Borrower, and Co-Borrower portals built using React.js and Node.js. Agents can onboard borrowers through customized websites, generate logins, and track applications, while the platform integrates with iSoftPull APIs to calculate buying power and loan eligibility, including co-borrower scenarios.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    category: "Full-Stack Web App",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "iSoftPull API"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/bpa-buying-power-analytics",
    featured: true
  }
];
