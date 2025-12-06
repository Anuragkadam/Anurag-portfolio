export interface Achievement {
  id: number;
  title: string;
  description: string;
  type: 'certification' | 'award' | 'publication' | 'speaking' | 'other';
  date: string;
  issuer?: string;
  url?: string;
  icon: string;
  featured?: boolean;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    description: "Professional level certification for designing distributed systems on AWS",
    type: "certification",
    date: "2023-06",
    issuer: "Amazon Web Services",
    url: "https://aws.amazon.com/certification/",
    icon: "🏆",
    featured: true
  },
  {
    id: 2,
    title: "Google Cloud Professional Developer",
    description: "Certification for developing applications on Google Cloud Platform",
    type: "certification",
    date: "2023-03",
    issuer: "Google Cloud",
    url: "https://cloud.google.com/certification",
    icon: "☁️",
    featured: true
  },
  {
    id: 3,
    title: "Best Innovation Award",
    description: "Won first place for developing an AI-powered healthcare solution",
    type: "award",
    date: "2022-11",
    issuer: "TechCrunch Disrupt",
    icon: "🥇",
    featured: true
  },
  {
    id: 4,
    title: "React Performance Optimization",
    description: "Published article on advanced React performance techniques",
    type: "publication",
    date: "2023-08",
    issuer: "Medium",
    url: "https://medium.com/@johndoe",
    icon: "📝",
    featured: false
  },
  {
    id: 5,
    title: "React Conference Speaker",
    description: "Spoke about 'Building Scalable React Applications' at React Summit",
    type: "speaking",
    date: "2023-05",
    issuer: "React Summit",
    url: "https://reactsummit.com",
    icon: "🎤",
    featured: true
  },
  {
    id: 6,
    title: "MongoDB Certified Developer",
    description: "Professional certification for MongoDB database development",
    type: "certification",
    date: "2023-01",
    issuer: "MongoDB",
    url: "https://www.mongodb.com/certification",
    icon: "🍃",
    featured: false
  },
  {
    id: 7,
    title: "Open Source Contributor",
    description: "Active contributor to major open source projects with 500+ contributions",
    type: "other",
    date: "2023-09",
    issuer: "GitHub",
    url: "https://github.com/johndoe",
    icon: "🚀",
    featured: false
  },
  {
    id: 8,
    title: "JavaScript Best Practices",
    description: "Published comprehensive guide on modern JavaScript development",
    type: "publication",
    date: "2023-07",
    issuer: "Dev.to",
    url: "https://dev.to/johndoe",
    icon: "📚",
    featured: false
  }
];
