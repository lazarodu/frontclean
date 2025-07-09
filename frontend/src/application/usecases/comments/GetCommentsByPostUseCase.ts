import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";

export class GetCommentsByPostUseCase {
    private repo: CommentRepository;

    constructor(repo: CommentRepository) {
        this.repo = repo;
    }

    async execute(post_id: string): Promise<Comment[]> {
        return await this.repo.getCommentsByPost(post_id);
    }
}
