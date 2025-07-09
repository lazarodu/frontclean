export interface PostProps {
  id: string;
  title: string;
  description: string;
  content: string
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  date: string;
}
export interface PostListProps {
  posts: PostProps[];
}
