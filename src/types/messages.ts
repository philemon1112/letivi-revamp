export interface MessageContact {
  id: number;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | string;
  private: number;
  email: string;
  picture: string;
  profile: string;
  invite_link: string;
}

export interface Contact {
  id: number;
  content: string | null;
  sender: MessageContact;
  recipient: MessageContact | null;
  recipient_email: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

export interface Message {
  content: string;
  recipient_id: number | null;
  recipient_email?: string | null;
  media_files?: string[];
  parent_id?: number | null;
}

export interface MessageMedia {
  id: number;
  path: string;
  type: string | null;
}

export interface MessageReply {
  id: number;
  content: string;
  sender: MessageContact;
  recipient: MessageContact;
  recipient_email: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
  media?: MessageMedia[];
}

export interface MessageWithReplies {
  id: number;
  content: string;
  sender: MessageContact;
  recipient: MessageContact;
  recipient_email: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

export interface MessageResponse {
  message: MessageWithReplies;
  replies: MessageReply[];
}

export interface emailPayload {
  recipient_email: string;
}
