export interface IndustriesData {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

interface Industry {
  id: number | string;
  name: string;
}

interface UserProfile {
  id: number;
  phone_number: string | null;
  picture: string;
  country: string;
  bio: string;
  profile: string;
  invite_link: string;
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

interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  private: number;
  email: string;
  profile: UserProfile;
  profession: Profession;
}

interface WorkspaceProfile {
  id: number;
  logo: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceData {
  id: number;
  name: string;
  specialize: string;
  private: number;
  tagline: string;
  slug: string;
  country: string;
  type: string;
  location: string;
  description: string;
  is_endorsed: boolean;
  total_followings: number;
  other_industry: string | null;
  created_at: string;
  updated_at: string;
  industry: Industry;
  user: User;
  event_profile?: WorkspaceProfile;
  business_profile?: WorkspaceProfile;
  project_profile?: WorkspaceProfile;
  total_collaborators: number;
  total_images: number;
  total_video: number;
  total_posts: number;
  collaborators?: User[];
}

export interface UserRolesData {
  id: number;
  name: string;
  updated_at: string;
}

interface PermissionsData {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

export interface Permission {
  id: string;
  name: string;
}
export interface UserRoleDetails {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  permissions: PermissionsData[];
}

export interface AssignPermissionData {
  role_id: number;
  permission_ids: string[];
}

export interface AssignUserData {
  role_id: number;
  user_id: string;
}

export interface Media {
  id: number;
  file_download: string | null;
  file_view: string | null;
  file_grid: string | null;
  post_id: number;
  path: string;
  type: string;
  mime_type: string;
  small_thumbnail: string;
  medium_thumbnail: string;
  large_thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
}

export interface Album {
  id: number;
  name: string;
  private: number;
  user_id: number;
  event_id: number | null;
  business_id: number | null;
  slug: string;
  project_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface PostUser {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  private: number;
  email: string;
  picture: string | null;
  profile: string;
  invite_link: string;
}

export type Post = {
  id: number;
  title: string;
  description: string;
  type: string;
  private: number;
  source: string;
  tag: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  user: PostUser;
  event: unknown | null;
  business: unknown | null;
  album: Album;
  project: unknown | null;
  category: Category;
  medias: Media[];
  bowed: boolean;
  saluted: boolean;
  fitsbumped: boolean;
  view_count: number;
  comment_count: number;
  fit_bump_count: number;
  salut_count: number;
  bow_count: number;
  download_count: number;
  impression_count: number;
  saved_count: number;
  width?: number;
  height?: number;
};

export interface SavedPost {
  id: number;
  created_at: string;
  updated_at: string;
  post: Post;
}

export interface AlbumsData {
  business_id: string | null;
  created_at: string;
  event_id: string | null;
  id: number;
  name: string;
  posts: Post[];
  private: number;
  project_id: string | null;
  slug: string;
  updated_at: string;
  user_id: number;
}

export interface AlbumFormData {
  name: string;
  private: number;
  event_id?: number;
  business_id?: number;
  project_id?: number;
}

export interface ReactionType {
  type: string;
  icon: string;
  label: string;
  color: string;
  activeState: "liked" | "loved" | "clapped";
  countKey: "fit_bump_count" | "salut_count" | "bow_count";
  addMutation: string;
  removeMutation: string;
}

export interface ReactionCounts {
  total: number;
  fit_bump_count: number;
  salut_count: number;
  bow_count: number;
}

export interface ReactionStates {
  liked: boolean;
  loved: boolean;
  clapped: boolean;
}
