import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";

export class UpdatePostUseCase {
  private repo: PostRepository;

  constructor(repo: PostRepository) {
    this.repo = repo;
  }

  async execute(id: string, data: Partial<Post>): Promise<Post> {
    return this.repo.update(id, data);
  }
}

