type Profile = {
  id: number;
  phone_number: string | null;
  picture: string;
  country: string;
  bio: string;
  profile: string;
  invite_link: string;
};
type WorkspaceProfile = {
  id: number;
  logo: string | null;
  linkedin: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  website: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

type Profession = {
  id: number;
  profession: string;
  work_experience: string | null;
  linkedin: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  website: string | null;
  tiktok: string | null;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  private: number;
  email: string;
  profile: Profile;

  profession: Profession;
};

type Industry = {
  id: number;
  name: string;
};

export type Workspace = {
  id: number;
  name: string;
  specialize: string;
  private: number;
  slug: string;
  country: string;
  type: string;
  location: string;
  description: string;
  is_endorsed: boolean;
  other_industry: any | null;
  created_at: string;
  updated_at: string;
  event_profile: WorkspaceProfile;
  business_profile: WorkspaceProfile;
  project_profile: WorkspaceProfile;
  total_images: number;
  total_video: number;
  total_posts: number;
  total_followings: number;
  industry: Industry;
  user: User;
  collaborators?: User[];
};

export type WorkspaceFormData = {
  name: string;
  tagline: string;
  country: string;
  industry_id: string | null;
  description: string;
  website: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
  logo: string;
  private: number;
  specialize: string;
  collaborator_id: string[];
  other_industry: string | null;
};

export type CollaboratorPayload = {
  business_id?: number;
  event_id?: number;
  project_id?: number;
  collaborators: number[];
};

export type deleteCollaboratorPayload = {
  collaborator_user_id: number;
  business_id?: string;
  event_id?: string;
  project_id?: string;
};
