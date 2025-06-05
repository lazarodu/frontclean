import { type CommentRepository } from "../../domain/repositories/CommentRepository";
import { Comment } from "../../domain/entities/Comment";
import { mockComments } from "../mocks/CommentMock";

export class CommentServiceInMemory implements CommentRepository {
    private comments: Comment[] = [...mockComments];

    getCommentsByPost(postId: string): Comment[] {
        return this.comments.filter((c) => c.postId === postId);
    }

    getCommentsByUser(userId: string): Comment[] {
        return this.comments.filter((c) => c.userId === userId);
    }

    async addComment(data: Omit<Comment, "id" | "date">): Promise<Comment> {
        const newComment = new Comment(
            `comment-${Date.now()}`,
            data.postId,
            data.userId,
            data.comment,
            new Date().toLocaleDateString()
        );
        this.comments.push(newComment);
        return newComment;
    }

    async deleteComment(id: string): Promise<void> {
        this.comments = this.comments.filter((c) => c.id !== id);
    }
}
