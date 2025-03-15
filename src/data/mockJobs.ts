
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  date: string;
  relevance?: number;
  salary?: string;
  postDate?: string;
  applyUrl?: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechVision",
    location: "Remote",
    description: "We're seeking an experienced frontend developer proficient in React, Tailwind CSS, and modern JavaScript to join our innovative team building next-generation web applications.",
    skills: ["JavaScript", "React", "Tailwind CSS", "TypeScript", "Git", "Responsive Design"],
    date: "2 days ago"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "InnovateSoft",
    location: "San Francisco, CA",
    description: "Join our fast-growing startup as a Full Stack Developer. You'll work on both frontend and backend systems using modern technologies to create amazing user experiences.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "AWS"],
    date: "1 day ago"
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "New York, NY",
    description: "We're looking for a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. Experience with design systems and prototyping tools is required.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems", "User Testing"],
    date: "3 days ago"
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "DataWorks",
    location: "Remote",
    description: "Join our backend team to build scalable APIs and services. You'll work with modern technologies to solve complex problems and deliver robust solutions.",
    skills: ["Node.js", "Python", "SQL", "Docker", "AWS", "API Design"],
    date: "5 days ago"
  },
  {
    id: "5",
    title: "Mobile Developer",
    company: "AppGenius",
    location: "Austin, TX",
    description: "We're seeking a mobile developer to create innovative iOS and Android applications. Experience with React Native or Flutter is highly desirable.",
    skills: ["React Native", "JavaScript", "Mobile Development", "iOS", "Android", "API Integration"],
    date: "2 days ago"
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    description: "Help us build and maintain our cloud infrastructure. You'll work with modern tools to automate deployments, ensure system reliability, and optimize performance.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    date: "1 week ago"
  },
  {
    id: "7",
    title: "Product Manager",
    company: "ProductForge",
    location: "Chicago, IL",
    description: "We're looking for a product manager to lead our product development process. You'll work closely with designers, developers, and stakeholders to create amazing products.",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics", "Communication"],
    date: "3 days ago"
  },
  {
    id: "8",
    title: "Data Scientist",
    company: "DataInsight",
    location: "Remote",
    description: "Join our data science team to extract insights from complex datasets. You'll apply advanced analytical techniques to solve real-world problems.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics", "R"],
    date: "4 days ago"
  },
  {
    id: "9",
    title: "Technical Writer",
    company: "DocuTech",
    location: "Portland, OR",
    description: "We need a skilled technical writer to create clear documentation for our products. You'll work with engineers to understand complex systems and explain them simply.",
    skills: ["Technical Writing", "Documentation", "Markdown", "Communication", "Research", "Editing"],
    date: "2 days ago"
  },
  {
    id: "10",
    title: "QA Engineer",
    company: "QualityFirst",
    location: "Remote",
    description: "Help us ensure our products meet the highest quality standards. You'll develop and execute test plans, automate testing processes, and identify critical issues.",
    skills: ["Test Automation", "Selenium", "API Testing", "QA Methodologies", "Jest", "Cypress"],
    date: "1 week ago"
  }
];
