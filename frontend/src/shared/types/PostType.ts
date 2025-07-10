import type { Email } from "../../domain/value-objects/Email";

export interface PostProps {
  id: string;
  title: string;
  description: string;
  content: string
  user_id: string;
  user?: {
    id: string;
    name: string;
    email: Email;
    role: 'user' | 'admin';
  };
  date: string;
}
export interface PostListProps {
  posts: PostProps[];
}
