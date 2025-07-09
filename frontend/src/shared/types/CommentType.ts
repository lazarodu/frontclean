export interface CommentProps {
  id: string
  post_id: string
  userId?: string
  comment: string
  date: string
}

export interface CommentListProps {
  comments: CommentProps[];
}