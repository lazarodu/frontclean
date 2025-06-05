import type { User } from "../../domain/entities/User";
import type { AuthRepository } from "../../domain/repositories/AuthRepository";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";
import { mockUsers } from "../mocks/UserMock";

export class AuthServiceInMemory implements AuthRepository {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    const user = mockUsers.find(
      (u) => u.email.getValue() === email && u.password?.getValue() === password
    );
    if (!user) throw new Error("Invalid email or password");
    this.currentUser = user;
    return user;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const existingUser = mockUsers.find((u) => u.email.getValue() === email)
    if (existingUser) {
      throw new Error("Este e-mail já está em uso")
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email: new Email(email),
        password: new Password(password),
        role: "user" as const
      }

      mockUsers.push(newUser)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser
      this.currentUser = newUser
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return userWithoutPassword
    }
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("currentUser")
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }
}
