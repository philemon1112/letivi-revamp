export type UserProfile = {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    private: number;
    profession: {
      id: number;
      profession: string;
      work_experience: string | null;
      linkedin: string | null;
      facebook: string | null;
      twitter: string | null;
    };
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    tiktok: string | null;
    twitter: string | null;
    website: string | null;
    work_experience: string | null;
    youtube: string | null;
    profile: {
      id: number;
      phone_number: string | null;
      picture: string;
      country: string;
      bio: string;
      invite_link: string;
    };
  }
  
export type EventProfile = {
    logo: string
}
export type Event = {
    collaborators: UserProfile[];
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    private: number;
    event_profile: EventProfile;
    profession: {
      id: number;
      profession: string;
      work_experience: string | null;
      linkedin: string | null;
      facebook: string | null;
      twitter: string | null;
    };
    facebook: string;
    id: number;
    instagram: string;
    linkedin: string;
    logo: string;
    twitter: string;
    updated_at: string;
    website: string;
    youtube: string;
    industry: {
      id: number;
      name: string;
    };
    location: string;
    name: string;
    slug: string;
    specialize: string;
    total_followings: number;
    total_images: number;
    total_posts: number;
    total_video: number;
    type: string;
    user: UserProfile;
  }