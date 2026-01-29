export interface DashboardStats {
  total_events: number;
  total_projects: number;
  total_businesses: number;
  total_users: number;
  total_public_users: number;
  total_private_users: number;
  total_users_online: number;
}

export interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO date format (e.g., "1926-03-05")
  gender: string;
  private: number;
  email: string;
  is_email_verified: boolean;
  is_blocked: number;
  block_reason: string | null;
  blocked_at: string | null; // ISO timestamp or null
  unblock_reason: string | null;
  unblocked_at: string | null; // ISO timestamp or null
  status: number;
  created_at: string; // ISO timestamp
  is_admin: boolean;
  total_posts: number;
  profile: UserProfile;
  profession: Profession;
  other_industry: string | null;
  industry: Industry;
  token?: string;
  user_role: UserRole;
  user_permissions: UserPermission[];
}

interface UserProfile {
  id: number;
  phone_number: string;
  picture: string;
  country: string;
  bio: string;
  profile: string; // URL to profile
  invite_link: string; // URL to invite
}

interface Profession {
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
}

interface Industry {
  id: number;
  name: string;
}

interface UserRole {
  id: number;
  name: string;
  updated_at: string; // ISO timestamp
}

interface UserPermission {
  id: number;
  name: string;
}

export interface DectivationForm {
  user_id: number;
  reason: string;
}
export interface ActivationForm {
  user_id: number;
}

export interface RevokeRoleForm {
  user_id: number;
  role_id: number;
}

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO 8601 formatted date string
  gender: "male" | "female" | "other"; // Assuming only these values
  private: number; // 0 or 1 (possibly a boolean indicator)
  signup_mode: "email" | "social" | string; // Can be extended based on options
  is_email_verified: boolean;
  is_blocked: number; // 0 or 1
  block_reason: string | null;
  blocked_at: string | null; // ISO 8601 formatted date string or null
  unblock_reason: string | null;
  unblocked_at: string | null; // ISO 8601 formatted date string or null
  status: number; // Example: 1 for active, 0 for inactive
  email: string;
  "2fa_status": "on" | "off"; // Assuming only these states
  last_seen: string | null; // ISO 8601 formatted date string or null
  created_at: string; // ISO 8601 formatted date string
  total_posts: number;
  profile: {
    id: number;
    phone_number: string | null;
    picture: string | null;
    country: string;
    bio: string | null;
    profile: string; // URL
    invite_link: string; // URL
  };
  picture: string | null;
  profession: {
    id: number;
    profession: string;
    work_experience: string | null;
    linkedin: string | null; // URL
    facebook: string | null; // URL
    twitter: string | null; // URL
    instagram: string | null; // URL
    youtube: string | null; // URL
    website: string | null; // URL
    tiktok: string | null; // URL
  };
  other_industry: string | null;
  industry: {
    id: number;
    name: string;
  };
}

export interface emailBroadcastPayload {
  filter: string;
  subject: string;
  message: string;
  meta?: {
    users_id?: number[];
    business_id?: string[];
    project_ids?: string[];
    event_ids?: string[];
    countries?: string[];
  };
}
