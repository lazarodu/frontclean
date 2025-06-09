import { type CommentRepository } from "../../../domain/repositories/CommentRepository";

export class DeleteCommentUseCase {
    private repo: CommentRepository;

    constructor(repo: CommentRepository) {
        this.repo = repo;
    }

    execute(id: string): void {
        this.repo.deleteComment(id);
    }
}
