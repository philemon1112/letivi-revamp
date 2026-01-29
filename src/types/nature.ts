type UserProfile = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  private: number;
  email: string;
  picture: string;
  profile: string;
  invite_link: string;
};

type Album = {
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
};

type Media = {
  id: number;
  file_download: unknown | null;
  file_view: unknown | null;
  file_grid: unknown | null;
  post_id: number;
  path: string;
  type: string;
  mime_type: string;
  small_thumbnail: string;
  medium_thumbnail: string;
  large_thumbnail: string;
  created_at: string;
  updated_at: string;
};

type Category = {
  id: number;
  name: string;
  created_at: string;
};

type Profile = {
  id: number;
  logo: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  created_at: string;
  updated_at: string;
  website: string;
  youtube: string;
};

type Project = {
  country: string;
  created_at: string;
  description: string;
  id: number;
  is_endorsed: boolean;
  name: string;
  other_industry: string | null;
  project_profile: Profile;
  slug: string;
  specialize: string;
  total_followings: number;
  updated_at: string;
};

type Business = {
  country: string;
  created_at: string;
  description: string;
  id: number;
  is_endorsed: boolean;
  name: string;
  other_industry: string | null;
  business_profile: Profile;
  slug: string;
  specialize: string;
  total_followings: number;
  updated_at: string;
};

type Event = {
  country: string;
  created_at: string;
  description: string;
  id: number;
  is_endorsed: boolean;
  name: string;
  other_industry: string | null;
  event_profile: Profile;
  slug: string;
  specialize: string;
  total_followings: number;
  updated_at: string;
};

export type Post = {
  pagination: any;
  id: number;
  title: string;
  description: string;
  type: string;
  private: number;
  source: string;
  tag: null;
  slug: string;
  created_at: string;
  updated_at: string;
  user: UserProfile;
  event: null | Event;
  business: null | Business;
  album: Album;
  project: Project | null;
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
  // post_shares.share_count
};

export type SaveToGalleryForms = {
  file_urls: String[];
  type: string;
  title: string;
  description: string;
  category_id: string;
  event_id: string | null;
  project_id: string | null;
  business_id: string | null;
  private: number;
  tag: string;
  album_id: number | null;
};
