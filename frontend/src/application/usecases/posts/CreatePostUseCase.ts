import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";

export class CreatePostUseCase {
  private repo: PostRepository;

  constructor(repo: PostRepository) {
    this.repo = repo;
  }

  async execute(data: Omit<Post, "id" | "user_id" | "date" | "user">): Promise<Post> {
    return this.repo.create(data);
  }
}
