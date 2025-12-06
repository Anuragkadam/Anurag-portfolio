export interface EducationStep {
  id: number;
  level: 'college' | 'higher-secondary' | 'secondary';
  institution: string;
  boardOrDegree: string;
  duration: string;
  location: string;
  details?: string;
}

export const educationJourney: EducationStep[] = [
  {
    id: 1,
    level: 'college',
    institution: 'Malwa Institute of Science and Technology',
    boardOrDegree: 'B.Tech in Information Technology',
    duration: '2019 – 2023 (4 years)',
    location: 'Indore, Madhya Pradesh',
    details: 'Graduated with 7.51 CGPA, building a strong foundation in software engineering and web development.',
  },
  {
    id: 2,
    level: 'higher-secondary',
    institution: 'Talent Higher Secondary School',
    boardOrDegree: 'MP Board – 12th (Mathematics stream)',
    duration: '2017 – 2019',
    location: 'Indore, Madhya Pradesh',
    details: 'Focused on Mathematics and Science, building strong problem-solving skills.',
  },
  {
    id: 3,
    level: 'secondary',
    institution: 'New Bhartiya Vidhiya Mandir',
    boardOrDegree: 'MP Board – 10th',
    duration: 'Completed before 2017',
    location: 'Indore, Madhya Pradesh',
    details: 'Completed secondary education with a strong interest in computers and technology.',
  },
];
