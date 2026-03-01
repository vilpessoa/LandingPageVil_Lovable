export interface PersonalData {
  firstName: string;
  lastName: string;
  title: string;
  subtitle: string;
  headline: string;
  available: boolean;
  cvUrl: string;
  linkedinUrl: string;
  email: string;
  location: string;
}

export interface MetricItem {
  id: string;
  value: string;
  prefix: string;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
}

export interface AboutData {
  text1: string;
  text2: string;
  highlights: string[];
  chartTitle: string;
}

export interface TechItem {
  name: string;
  level: number;
}

export interface TechCategory {
  id: string;
  title: string;
  color: string;
  icon: string;
  techs: TechItem[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  result: string;
  metrics: ProjectMetric[];
  color: string;
  icon: string;
}

export interface Principle {
  number: string;
  title: string;
  desc: string;
}

export interface PhilosophyData {
  quote: string;
  author: string;
  principles: Principle[];
}

export interface AdminData {
  password: string;
}

export interface SiteData {
  personal: PersonalData;
  metrics: MetricItem[];
  about: AboutData;
  techStack: TechCategory[];
  extraTechs: string[];
  projects: Project[];
  philosophy: PhilosophyData;
  admin: AdminData;
}
