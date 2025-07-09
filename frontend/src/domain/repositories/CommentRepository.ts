import { Comment } from "../entities/Comment";

export interface CommentRepository {
    getCommentsByPost(post_id: string): Promise<Comment[]>;
    getCommentsByUser(): Promise<Comment[]>;
    addComment(data: Omit<Comment, "id" | "userId" | "date">): Promise<Comment>;
    deleteComment(id: string): Promise<void>;
}
