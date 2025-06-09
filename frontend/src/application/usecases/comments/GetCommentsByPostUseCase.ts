import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";

export class GetCommentsByPostUseCase {
    private repo: CommentRepository;

    constructor(repo: CommentRepository) {
        this.repo = repo;
    }

    execute(postId: string): Comment[] {
        return this.repo.getCommentsByPost(postId);
    }
}
