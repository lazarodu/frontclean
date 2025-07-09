import { type PostRepository } from "../../../domain/repositories/PostRepository";
import { Post } from "../../../domain/entities/Post";
import { api } from "../../http/axios";
import { parseApiError } from "../../http/apiError";
import type { AxiosError } from "axios";

export class PostServiceHttp implements PostRepository {
  async getAll(): Promise<Post[]> {
    try {
      const res = await api.get("/posts");
      return res.data.map((p: Post) =>
        new Post(p.id, p.title, p.description, p.content, p.user_id, p.date, p.user)
      );
    } catch (err) {
      throw parseApiError(err);
    }
  }

  async getById(id: string): Promise<Post | null> {
    try {
      const res = await api.get(`/posts/${id}`);
      const p = res.data;
      return new Post(p.id, p.title, p.description, p.content, p.user_id, p.date, p.user);
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) return null;
      throw parseApiError(err);
    }
  }

  async create(data: Omit<Post, "id" | "user_id" | "date">): Promise<Post> {
    try {
      const res = await api.post("/posts", { ...data, date: new Date().toISOString() });
      const p = res.data;
      return new Post(p.id, p.title, p.description, p.content, p.user_id, p.date, p.user);
    } catch (err) {
      throw parseApiError(err);
    }
  }

  async update(id: string, data: Partial<Post>): Promise<Post> {
    try {
      const res = await api.put(`/posts/${id}`, data);
      const p = res.data;
      return new Post(p.id, p.title, p.description, p.content, p.user_id, p.date, p.user);
    } catch (err) {
      throw parseApiError(err);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/posts/${id}`);
    } catch (err) {
      throw parseApiError(err);
    }
  }
}
