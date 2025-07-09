import { type UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/Email";
import { api } from "../../http/axios";
import { parseApiError } from "../../http/apiError";

export class UserServiceHttp implements UserRepository {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    try {
      const token = await api.post("/users/login", { email, password });
      localStorage.setItem("token", token.data.access_token);
      const response = await api.get("/users/me");

      const user = new User(
        response.data.id,
        response.data.name,
        new Email(response.data.email),
        response.data.role
      );

      this.currentUser = user;
      return user;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const response = await api.post("/users/register", { name, email, password, role: 'user' });
      return new User(
        response.data.id,
        response.data.name,
        new Email(response.data.email),
        response.data.role
      );
    } catch (error) {
      throw parseApiError(error);
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    api.defaults.headers.common["Authorization"] = "";
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user
  }
}
