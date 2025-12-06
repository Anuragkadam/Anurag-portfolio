import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Frontend / Full-Stack Developer",
    company: "Mindcrew Technologies",
    location: "Indore, India",
    duration: "July 2022 – Present",
    description: [
      "Developed scalable and responsive web applications using React, TypeScript, Shadcn, TailwindCSS, Redux, and Zustand, improving UI performance and reducing load time by up to 30%.",
      "Engineered secure authentication workflows with Auth0, JWT, and Firebase (Google/Facebook logins), reducing onboarding friction and security issues.",
      "Built REST APIs with Node.js, Express, and MongoDB, and implemented Stripe-based payment flows including checkout and subscriptions, enabling automated billing and reducing manual effort.",
      "Collaborated with designers using Figma to deliver pixel-perfect, reusable UI components and streamline development across multiple projects."
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "Shadcn",
      "Auth0",
      "Firebase Auth",
      "JWT",
      "Stripe"
    ],
    icon: "💼"
  }
];
