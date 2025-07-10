import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";
import { MockDatabase } from "../../mocks/MockDatabase";

export class PostServiceInMemory implements PostRepository {
  // private posts: Post[] = [...mockPosts];
  // private users: User[] = [...mockUsers];

  async getAll(): Promise<Post[]> {
    return MockDatabase.posts.map((p) => ({
      ...p,
      user: MockDatabase.users.filter(u => u.id === p.user_id)[0]
    }))
  }

  async getById(id: string): Promise<Post | null> {
    const post = MockDatabase.posts.find((p) => p.id === id) ?? null;
    if (!post) return null;
    return { ...post, user: MockDatabase.users.find(u => u.id === post.user_id) ?? undefined };
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
    MockDatabase.posts.push(newPost);
    return newPost;
  }

  async update(id: string, data: Partial<Post>): Promise<Post> {
    const index = MockDatabase.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Post não encontrado");
    const updated = { ...MockDatabase.posts[index], ...data };
    MockDatabase.posts[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<void> {
    MockDatabase.posts = MockDatabase.posts.filter((p) => p.id !== id);
  }
}
