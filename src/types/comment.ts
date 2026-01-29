export type CommentType = {
  id: number;
  post_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    picture: string;
  };
} | undefined;
