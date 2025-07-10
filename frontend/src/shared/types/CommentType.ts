export interface CommentProps {
  id: string
  post_id: string
  userId?: string
  comment: string
  date: Date
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface CommentListProps {
  comments: CommentProps[];
}