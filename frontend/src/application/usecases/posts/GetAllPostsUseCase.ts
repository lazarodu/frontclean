import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";

export class GetAllPostsUseCase {
  private repo: PostRepository;

  constructor(repo: PostRepository) {
    this.repo = repo;
  }

  async execute(): Promise<Post[]> {
    return this.repo.getAll();
  }
}
