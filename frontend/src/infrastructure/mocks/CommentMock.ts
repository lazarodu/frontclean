import type { CommentProps } from "../../shared/types/CommentType"

export const mockComments: CommentProps[] = [
  {
    id: "comment-1",
    postId: "post-1",
    userId: "user-1",
    comment: "Comentário sobre o Post 1.",
    data: "25/05/2025"
  },
  {
    id: "comment-2",
    postId: "post-1",
    userId: "user-2",
    comment: "Comentário 2 sobre o Post 1.",
    data: "23/05/2025"
  },
  {
    id: "comment-3",
    postId: "post-2",
    userId: "user-2",
    comment: "Comentário 1 sobre o Post 2.",
    data: "24/05/2025"
  }
]

