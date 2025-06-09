import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";

export class GetCommentsByUserUseCase {
    private repo: CommentRepository;

    constructor(repo: CommentRepository) {
        this.repo = repo;
    }

    execute(userId: string): Comment[] {
        return this.repo.getCommentsByUser(userId);
    }
}
