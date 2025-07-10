import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";
import { MockDatabase } from "../../mocks/MockDatabase"
import { DataStorage } from "../http/DataStorage";

export class CommentServiceInMemory implements CommentRepository {
    // private comments: Comment[] = [...mockComments];
    // private users: User[] = [...mockUsers];

    async getCommentsByPost(post_id: string): Promise<Comment[]> {
        return MockDatabase.comments.filter((comment) => comment.post_id === post_id).map((p) => ({
            ...p,
            user: MockDatabase.users.filter(u => u.id === p.user_id)[0]
        }))
    }

    async getCommentsByUser(): Promise<Comment[]> {
        // const user = JSON.parse(localStorage.getItem("currentUser") ?? "")
        const user = DataStorage.get("currentUser") ?? "";
        return MockDatabase.comments.filter((c) => c.user_id === user.id);
    }

    async addComment(data: Omit<Comment, "id" | "date">): Promise<Comment> {
        // const user_id = JSON.parse(localStorage.getItem("currentUser") ?? "").id;
        const user_id = DataStorage.get("currentUser")?.id ?? "";
        const newComment = new Comment(
            `comment-${Date.now()}`,
            data.post_id,
            user_id,
            data.comment,
            new Date(),
            MockDatabase.users.find(u => u.id === user_id) ?? undefined
        );
        MockDatabase.comments.push(newComment);
        return newComment;
    }

    async deleteComment(id: string): Promise<void> {
        MockDatabase.comments = MockDatabase.comments.filter((c) => c.id !== id);
    }
}
