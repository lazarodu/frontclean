import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";

export class GetPostByIdUseCase {
  private repo: PostRepository;

  constructor(repo: PostRepository) {
    this.repo = repo;
  }

  execute(id: string): Post | null {
    return this.repo.getById(id);
  }
}
