export type FieldKey = 'cs' | 'mech' | 'elec' | 'civil';

export interface StudyNote {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  downloads: number;
  year: 1 | 2 | 3 | 4;
  semester?: 1 | 2;
  courseCode?: string;
  iptaCurriculumNote?: string;
  eacOutcome?: string; // EAC/BEM Washington Accord Graduate Attribute (WA1-WA12)
  overview: string;
  keyFormulas?: string[];
  coreConcepts: string[];
  codeSnippet?: {
    lang: string;
    code: string;
  };
}

export interface CuratedVideo {
  id: string;
  title: string;
  creator: string;
  duration: string;
  views: string;
  url: string;
  year?: 1 | 2 | 3 | 4 | 'All';
  labType?: 'Virtual Lab' | 'Lecture' | 'Design Workshop' | 'FYP / Capstone';
  topics: string[];
  description: string;
}

export interface IndustryProject {
  id: string;
  title: string;
  organization: string;
  budget: string;
  status: string;
  impact: string;
  timeline: string;
  keyMilestones: string[];
  techStack: string[];
  malaysianContext?: string;
}

export interface DIYProject {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetYear?: 'Year 1 Mini Project' | 'Year 2 Design Lab' | 'Year 3 IDP (Integrated Design)' | 'Year 4 Capstone / FYP';
  iptaAlignment?: string;
  estHours: string;
  stack: string[];
  description: string;
  components: string[];
  assemblyPhases: string[];
  sampleCode?: {
    filename: string;
    code: string;
  };
}

export interface FieldConfig {
  id: FieldKey;
  title: string;
  subtitle: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  bgGlow: string;
  description: string;
  personaTitle: string;
  traitDescription: string;
  notes: StudyNote[];
  videos: CuratedVideo[];
  industryProjects: IndustryProject[];
  diyProjects: DIYProject[];
}

export interface CommunityProject {
  id: string;
  title: string;
  author: string;
  field: FieldKey;
  fieldTitle: string;
  likes: number;
  techStack: string[];
  description: string;
  repoUrl: string;
  seekingMembers: boolean;
  lookingFor: string | null;
  bookmarked?: boolean;
}

export interface EngineeringSquad {
  id: string;
  title: string;
  lead: string;
  field: FieldKey;
  membersNeeded: string[];
  description: string;
  spotsLeft: number;
  contactEmail?: string;
}
