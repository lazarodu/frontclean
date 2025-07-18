import { Post } from "../entities/Post";

export interface PostRepository {
  getAll(): Promise<Post[]>
  getById(id: string): Promise<Post | null>
  create(data: Omit<Post, "id" | "user_id" | "date" | "user">): Promise<Post>
  update(id: string, data: Partial<Post>): Promise<Post>
  delete(id: string): Promise<void>
}
