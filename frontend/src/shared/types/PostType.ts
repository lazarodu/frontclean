export interface PostProps {
  id: string;
  title: string;
  description: string;
  content: string
  autor: string;
  data: string;
}
export interface PostListProps {
  posts: PostProps[];
}
