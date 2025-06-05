import { Comment } from "../entities/Comment";

export interface CommentRepository {
    getCommentsByPost(postId: string): Comment[];
    getCommentsByUser(userId: string): Comment[];
    addComment(data: Omit<Comment, "id" | "data">): Promise<Comment>;
    deleteComment(id: string): Promise<void>;
}
