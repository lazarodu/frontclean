export interface CommentProps {
  id: string
  postId: string
  userId: string
  comment: string
  autor?: string
  data: string
}

export interface CommentListProps {
  comments: CommentProps[];
}