import { UserData } from "./auth";
import { Professional } from "./common/professional";
import { UserProfile } from "./events";

export interface Organization {
  id: number;
  role: string;
  country: string;
  organization: string;
  work_experience: string;
  created_at: string;
  updated_at: string;
}

export interface Award {
  id: number;
  award: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Qualification {
  id: number;
  qualification: string;
  education: string;
  created_at: string;
  updated_at: string;
}

export interface Nomination {
  id: number;
  nomination: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: number;
  name: string;
}

export interface Project {
  books: Item[];
  articles: Item[];
  photography: Item[];
  films: Item[];
  exhibition: Item[];
  others: Item[];
}

export interface ProjectUpdatePayload {
  books: string[];
  articles: string[];
  photography: string[];
  films: string[];
  exhibition: string[];
  others: string[];
}

export interface Followers {
  created_at: string;
  id: number;
  updated_at: string;
  user: Professional;
}

export interface BasicFormData {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  industry_id: string;
  other_industry: string;
  profession: string;
  phone: string;
  biography: string;

  // Social Option
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  website: string;
  tiktok: string;
}

export interface ProfessionalFormData {
  organizations: Organization[] | null;
  awards: Award[] | null;
  nominations: Nomination[] | null;
  qualifications: Qualification[] | null;
  work_experience: number;
}

export interface switchActionPayload {
  action: string; 
}
