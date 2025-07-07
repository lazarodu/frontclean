export interface PostProps {
  id: string;
  title: string;
  description: string;
  content: string
  user_id: string;
  date: string;
}
export interface PostListProps {
  posts: PostProps[];
}
