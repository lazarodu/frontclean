
import type { PostProps } from "../../shared/types/PostType";

export const mockPosts: PostProps[] = [
  {
    id: "post-1",
    title: "Post 1",
    description: "Descrição do Post 1",
    content: "Conteúdo do Post 1",
    user_id: "user-1",
    date: new Date("2025-05-12"),
  },
  {
    id: "post-2",
    title: "Post 2",
    description: "Descrição do Post 2",
    content: "Conteúdo do Post 2",
    user_id: "user-2",
    date: new Date("2025-05-11"),
  },
];

