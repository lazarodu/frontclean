import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";
import { mockPosts } from "../../mocks/PostMock";

export class PostServiceInMemory implements PostRepository {
  private posts: Post[] = [...mockPosts];

  async getAll(): Promise<Post[]> {
    return this.posts;
  }

  async getById(id: string): Promise<Post | null> {
    return this.posts.find((p) => p.id === id) ?? null;
  }

  async create(data: Omit<Post, "id" | "date">): Promise<Post> {
    const newPost = new Post(
      `post-${Date.now()}`,
      data.title,
      data.description,
      data.content,
      data.user_id,
      new Date()
    );
    this.posts.push(newPost);
    return newPost;
  }

  async update(id: string, data: Partial<Post>): Promise<Post> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Post não encontrado");
    const updated = { ...this.posts[index], ...data };
    this.posts[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.posts = this.posts.filter((p) => p.id !== id);
  }
}
