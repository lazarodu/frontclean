import { type CommentRepository } from "../../../domain/repositories/CommentRepository";
import { Comment } from "../../../domain/entities/Comment";
import { api } from "../../http/axios";
import { parseApiError } from "../../http/apiError";

export class CommentServiceHttp implements CommentRepository {
  private allComments: Comment[] = [];

  async addComment(data: Omit<Comment, "id" | "date">): Promise<Comment> {
    try {
      const res = await api.post("/comments", data);
      const c = res.data;
      const comment = new Comment(c.id, c.post_id, c.userId, c.comment, c.date);
      this.allComments.push(comment);
      return comment;
    } catch (err) {
      throw parseApiError(err);
    }
  }

  async getCommentsByPost(post_id: string): Promise<Comment[]> {
    try {
      const res = await api.get(`/comments/post/${post_id}`);
      return res.data;
    } catch (err) {
      throw parseApiError(err);
    }
  }

  async getCommentsByUser(): Promise<Comment[]> {
    try {
      const res = await api.get(`/comments/user/`);
      return res.data;
    } catch (err) {
      throw parseApiError(err);
    }
  }

  async deleteComment(id: string): Promise<void> {
    try {
      await api.delete(`/comments/${id}`);
      this.allComments = this.allComments.filter((c) => c.id !== id);
    } catch (err) {
      throw parseApiError(err);
    }
  }
}
