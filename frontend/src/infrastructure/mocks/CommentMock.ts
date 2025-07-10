import type { Comment } from "../../domain/entities/Comment"

export const mockComments: Comment[] = [
  {
    id: "comment-1",
    post_id: "post-1",
    user_id: "user-1",
    comment: "Comentário sobre o Post 1.",
    date: new Date("2025-05-25")
  },
  {
    id: "comment-2",
    post_id: "post-1",
    user_id: "user-2",
    comment: "Comentário 2 sobre o Post 1.",
    date: new Date("2025-05-23")
  },
  {
    id: "comment-3",
    post_id: "post-2",
    user_id: "user-2",
    comment: "Comentário 1 sobre o Post 2.",
    date: new Date("2025-05-24")
  }
]

