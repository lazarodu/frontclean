import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";

export class GetCommentsByUserUseCase {
    private repo: CommentRepository;

    constructor(repo: CommentRepository) {
        this.repo = repo;
    }

    async execute(userId: string): Promise<Comment[]> {
        return await this.repo.getCommentsByUser(userId);
    }
}
