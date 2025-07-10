import type { User } from "../../../domain/entities/User";
import type { UserRepository } from "../../../domain/repositories/UserRepository";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { MockDatabase } from "../../mocks/MockDatabase";
import { DataStorage } from "../http/DataStorage";

export class UserServiceInMemory implements UserRepository {
  // private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    const user = MockDatabase.users.find(
      (u) => u.email.getValue() === email && u.password?.getValue() === password
    );
    if (!user) throw new Error("Invalid email or password");
    MockDatabase.currentUser = user;
    return user;
  }

  async register(name: string, email: string, password: string): Promise<string> {
    const existingUserEmail = MockDatabase.users.find((u) => u.email.getValue() === email)
    const existingUserName = MockDatabase.users.find((u) => u.name === name)
    if (existingUserEmail) {
      throw new Error("Este e-mail já está em uso")
    } else if (existingUserName) {
      throw new Error("Este nome já está em uso")
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email: new Email(email),
        password: new Password(password),
        role: "user" as const
      }

      MockDatabase.users.push(newUser)

      // const { password: _, ...userWithoutPassword } = newUser
      // this.currentUser = newUser
      // localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      // return userWithoutPassword
      return "Usuário registrado com sucesso"
    }
  }

  logout(): void {
    MockDatabase.currentUser = null;
    // localStorage.removeItem("currentUser")
    DataStorage.clear();
  }

  getCurrentUser(): User | null {
    return MockDatabase.currentUser
  }

  setCurrentUser(user: User): void {
    MockDatabase.currentUser = user;
  }
}
