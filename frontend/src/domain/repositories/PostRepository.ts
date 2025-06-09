import { Post } from "../entities/Post";

export interface PostRepository {
  getAll(): Post[];
  getById(id: string): Post | null;
  create(data: Omit<Post, "id" | "data">): Promise<Post>;
  update(id: string, data: Partial<Post>): Promise<Post>;
  delete(id: string): Promise<void>;
}
