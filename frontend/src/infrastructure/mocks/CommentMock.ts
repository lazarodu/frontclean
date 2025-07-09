import type { Comment } from "../../domain/entities/Comment"

export const mockComments: Comment[] = [
  {
    id: "comment-1",
    post_id: "post-1",
    userId: "user-1",
    comment: "Comentário sobre o Post 1.",
    date: "25/05/2025"
  },
  {
    id: "comment-2",
    post_id: "post-1",
    userId: "user-2",
    comment: "Comentário 2 sobre o Post 1.",
    date: "23/05/2025"
  },
  {
    id: "comment-3",
    post_id: "post-2",
    userId: "user-2",
    comment: "Comentário 1 sobre o Post 2.",
    date: "24/05/2025"
  }
]

