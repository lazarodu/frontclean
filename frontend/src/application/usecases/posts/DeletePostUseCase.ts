import { type PostRepository } from "../../../domain/repositories/PostRepository";

export class DeletePostUseCase {
  private repo: PostRepository;

  constructor(repo: PostRepository) {
    this.repo = repo;
  }

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
