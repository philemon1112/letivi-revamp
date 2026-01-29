import { Media, Post, PostUser, SavedPost } from "./common";

export interface SavedResponse {
  saved_posts: SavedPost[];
  user: PostUser;
}

export interface BioDownloadersResponse {
  id: number;
  created_at: string;
  updated_at: string;
  user: PostUser;
}

export interface PostDownloadersResponse {
  media: Media[];
  download_count: {
    downloads_count: number;
    created_at: string;
    id: number;
    post_id: number;
    updated_at: string;
  };
  source: string;
  post_id: number | null;
}

export interface GalleryPostResponse {
  posts: Post[];
  total_posts: number;
  total_private_post_images: number;
  total_private_post_videos: number;
  total_public_post_images: number;
  total_public_post_videos: number;
}

export interface AlbumDetailsResponse {
  posts: Post[];
  business_id: number | null;
  event_id: number | null;
  project_id: number | null;
  id: number;
  name: string;
  private: number;
  slug: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
