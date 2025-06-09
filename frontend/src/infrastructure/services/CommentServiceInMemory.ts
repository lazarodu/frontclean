import { type CommentRepository } from "../../domain/repositories/CommentRepository";
import { Comment } from "../../domain/entities/Comment";
import { mockComments } from "../mocks/CommentMock";
import type { User } from "../../domain/entities/User";
import { mockUsers } from "../mocks/UserMock";

export class CommentServiceInMemory implements CommentRepository {
    private comments: Comment[] = [...mockComments];
    private users: User[] = [...mockUsers];

    getCommentsByPost(postId: string): Comment[] {
        // return this.comments.filter((c) => c.postId === postId);
        return this.comments.filter((comment) => comment.postId === postId).map((p) => ({
            ...p,
            autor: this.users.filter(u => u.id === p.userId)[0].name
        }))
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
