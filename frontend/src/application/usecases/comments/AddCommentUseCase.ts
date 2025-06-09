import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";

export class AddCommentUseCase {
    private repo: CommentRepository;

    constructor(repo: CommentRepository) {
        this.repo = repo;
    }

    async execute(data: Omit<Comment, "id" | "data">): Promise<Comment> {
        return this.repo.addComment(data);
    }
}
