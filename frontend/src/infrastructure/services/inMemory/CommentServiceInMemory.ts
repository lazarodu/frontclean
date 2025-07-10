import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";
import { mockComments } from "../../mocks/CommentMock";
import type { User } from "../../../domain/entities/User";
import { mockUsers } from "../../mocks/UserMock";

export class CommentServiceInMemory implements CommentRepository {
    private comments: Comment[] = [...mockComments];
    private users: User[] = [...mockUsers];

    async getCommentsByPost(post_id: string): Promise<Comment[]> {
        // return this.comments.filter((c) => c.post_id === post_id);
        return this.comments.filter((comment) => comment.post_id === post_id).map((p) => ({
            ...p,
            autor: this.users.filter(u => u.id === p.userId)[0].name
        }))
    }

    async getCommentsByUser(): Promise<Comment[]> {
        const user = JSON.parse(localStorage.getItem("currentUser") ?? "")
        return this.comments.filter((c) => c.userId === user.id);
    }

    async addComment(data: Omit<Comment, "id" | "date">): Promise<Comment> {
        const newComment = new Comment(
            `comment-${Date.now()}`,
            data.post_id,
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
